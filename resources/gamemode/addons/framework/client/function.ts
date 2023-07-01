export const Delay = (time: number) => new Promise<void>(resolve => setTimeout(resolve, time));

export function Notification(message: string, duration: number) {
    SendReactMessage("sendNotification",
    {
        message: message,
        duration: duration,
    });
}

export function SendReactMessage(action: string, data: any) {
    SendNuiMessage(JSON.stringify({
        type: action,
        data: data
    }))
}

export function playerJoining() {
    FreezeEntityPosition(PlayerPedId(), false);
    const ped = PlayerId();
    ClearPedTasksImmediately(ped);
    RemoveAllPedWeapons(ped, true);
    ClearPlayerWantedLevel(PlayerId());
    ShutdownLoadingScreen();
    ShutdownLoadingScreenNui();
    Notification("Welcome to the server!", 5000)
    console.log("Hello World!")
}