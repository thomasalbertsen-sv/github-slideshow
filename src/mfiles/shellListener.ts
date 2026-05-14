// UIX bootstrap: M-Files calls OnNewShellUI when the user opens a vault in
// the shell (desktop or web). The shell exposes events we hook into.
//
// Reference: https://developer.m-files.com/Frameworks/User-Interface-Extensibility-Framework/

declare global {
    interface Window {
        MFiles?: unknown;
    }
    function OnNewShellUI(shellUI: ShellUI): void;
}

interface ShellUI {
    Events: {
        Register(eventName: string, handler: (...args: unknown[]) => void): void;
    };
    ShellFrame?: unknown;
}

export function registerShell(): void {
    (globalThis as unknown as { OnNewShellUI: (shellUI: ShellUI) => void }).OnNewShellUI = (
        shellUI: ShellUI,
    ): void => {
        shellUI.Events.Register("OnStarted", () => {
            // Shell started - dashboard is registered via appdef.xml.
            // Additional shell-level setup (custom commands, toolbars) goes here.
        });
    };
}
