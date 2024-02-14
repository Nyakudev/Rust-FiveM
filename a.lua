print('loaded')
net.Start("zclib_Inventory_Collect") net.WriteEntity("item_ammo_pistol_large") net.WriteUInt(1,16) net.SendToServer()
