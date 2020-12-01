import icon from './src/icon/index'
import wallpaper from './src/wallpaper/index'
import windows from './src/windows/index'
import avatar from './src/avatar/index'

export default class Resource {

    public static icon: object = icon;
    public static wallpaper: object = wallpaper;
    public static windows: object = windows;
    public static avatar: object = avatar;

    // constructor(app) {
    //     this.icon = icon;
    //     this.wallpaper = wallpaper;
    //     this.windows = windows;

    //     app.provide("$resource.icon", this.icon);
    //     app.provide("$resource.wallpaper", this.wallpaper);
    //     app.provide("$resource.windows", this.windows);
    // };


}