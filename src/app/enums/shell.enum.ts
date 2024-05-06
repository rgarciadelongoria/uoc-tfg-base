export enum ShellActions {
    SHELL_VERSION = "shellVersion",
    SHELL_PUSH_TOKEN = "shellPushToken",
}

export enum ShellEvents {
    SHELL_DEVICE_GET_ID = "shellDeviceGetId",
    SHELL_DEVICE_GET_ID_RESPONSE = "shellDeviceGetIdResponse",
    SHELL_PUSH_REQUEST_PERMISSION = "shellPushRequestPermission",
    SHELL_PUSH_REQUEST_PERMISSION_RESPONSE = "shellPushRequestPermissionResponse",
    SHELL_PUSH_REGISTER = "shellPushRegister",
    SHELL_PUSH_REGISTER_RESPONSE = "shellPushRegisterResponse",
    SHELL_SCANNER_RESPONSE = "shellScannerResponse",
    SHELL_SCANNER_REQUEST_PERMISSION = "shellScannerRequestPermission",
    SHELL_SCANNER_REQUEST_PERMISSION_RESPONSE = "shellScannerRequestPermissionResponse",
    SHELL_SCANNER_START = "shellScannerStart",
    SHELL_SCANNER_STOP = "shellScannerStop",
    SHELL_SCANNER_ERROR = "shellScannerError",
    SHELL_BROWSER_OPEN = "shellBrowserOpen",
    SHELL_BROWSER_OPEN_RESPONSE = "shellBrowserOpenResponse",
}

export enum ShellErrors {
    SHELL_LOADING_REMOTE_OK = "shellLoadingRemoteOk",
}
