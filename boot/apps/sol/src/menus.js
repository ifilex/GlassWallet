var menus = {
	"&Game": [
		{
			item: "&Deal",
			shortcut: "F2",
			action: ()=> { resetGame(); },
			description: "Deal a new game",
		},
		// Don't want to imply you can undo by showing this option
		// {
		// 	item: "&Undo",
		// 	shortcut: "",
		// 	enabled: false,
		// 	action: ()=> { undo(); },
		// 	description: "Undo last action",
		// },
		{
			item: "De&ck...",
			shortcut: "",
			enabled: false,
			action: ()=> {},
			description: "Choose new deck back",
		},
		{
			item: "&Options...",
			shortcut: "",
			enabled: false,
			action: ()=> {},
			description: "Change Solitaire options",
			},
		MENU_DIVIDER,
		{
			item: "E&xit",
			shortcut: "",
			action: ()=> {
				try {
					// API contract is containing page can override window.close()
					// Note that e.g. (()=>{}).bind().toString() gives "function () { [native code] }"
					// so the window.close() must not use bind() (not that that's common practice anyway)
					if (frameElement && window.close && !/\{\s*\[native code\]\s*\}/.test(window.close.toString())) {
						window.close();
						return;
					}
				} catch (e) {
					// In a cross-origin iframe, most likely
					// @TODO: establish postMessage API
				}
				// In a cross-origin iframe, or same origin but without custom close(), or top level:
				// Not all browsers support close() for closing a tab,
				// so redirect instead. Exit to the official web desktop.
				window.location = "../../start/index.html";
			},
			description: "Exit Solitaire",
		}
	],
};

var go_outside_frame = false;
if(frameElement){
	try{
		if(parent.MenuBar){
			MenuBar = parent.MenuBar;
			go_outside_frame = true;
		}
	}catch(e){}
}
var menu_bar = new MenuBar(menus);
if (go_outside_frame) {
	frameElement.parentElement.insertBefore(menu_bar.element, frameElement);
} else {
	document.body.prepend(menu_bar.element);
}
