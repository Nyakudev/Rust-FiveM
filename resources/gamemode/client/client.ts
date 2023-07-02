import { createNuiCallBacks } from './nui';
import Template from './utils/Template';
export const Delay = (time: number) => new Promise<void>(resolve => setTimeout(resolve, time));

export function playerJoining() {
    FreezeEntityPosition(PlayerPedId(), false);
    const ped = PlayerId();
    ClearPedTasksImmediately(ped);
    RemoveAllPedWeapons(ped, true);
    ClearPlayerWantedLevel(PlayerId());
    ShutdownLoadingScreen();
    ShutdownLoadingScreenNui();
    console.log("Hello World!")
}

export function Revive() {
    const ped = PlayerPedId();
    SetEntityHealth(ped, 200);
    ClearPedBloodDamage(ped);
    ResetPedVisibleDamage(ped);
    ClearPedLastWeaponDamage(ped);
    ResetPedMovementClipset(ped, 0);
    ClearPedTasksImmediately(ped);
}
setImmediate(() => {
    while (true) {
      Wait(0);
      if (NetworkIsPlayerActive(PlayerId())) {
            playerJoining();
            Revive();
        break;
      }
    }
});

on('onResourceStart', (resName: string) => {
    if (resName === GetCurrentResourceName()) {
        // eslint-disable-next-line no-console
        console.log(
            `TypeScript template started! Use '/template' command to open the UI menu.`
        );
    }
});

createNuiCallBacks();

RegisterCommand('template', Template.open, false);

RegisterCommand("car", async (source: number, args: string[], rawCommand: string) => {
    const [model] = args
    const modelHash = GetHashKey(model)

    if (!IsModelInCdimage(modelHash)) return

    RequestModel(modelHash)
    while (!HasModelLoaded(modelHash)) await Delay(100)

    const [x, y, z] = GetEntityCoords(PlayerPedId(), true)
    const h = GetEntityHeading(PlayerPedId())
    const a = "Oui les amis, je suis beau"
    const veh = CreateVehicle(modelHash, x, y, z, h, true, true)

    while (!DoesEntityExist(veh)) await Delay(100)

    SetPedIntoVehicle(PlayerPedId(), veh, -1)
    console.log(modelHash); console.log(a)

    SetVehicleColours(veh, 65, 12)
}, false)

onNet('template:send-notification', Template.sendNotification);
