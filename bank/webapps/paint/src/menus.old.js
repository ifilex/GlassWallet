(()=> {

const looksLikeChrome = !!(window.chrome && (window.chrome.loadTimes || window.chrome.csi));
// NOTE: Microsoft Edge includes window.chrome.app
// (also this browser detection logic could likely use some more nuance)

window.menus = {
	[localize("&File")]: [
		{
			item: localize("&New"),
			shortcut: "Ctrl+Alt+N", // Ctrl+N opens a new browser window
			speech_recognition: [
				"new", "new file", "new document", "create new document", "create a new document", "start new document", "start a new document",
			],
			action: ()=> { file_new(); },
			description: localize("Creates a new document."),
		},
		{
			item: localize("&Open"),
			shortcut: "Ctrl+O",
			speech_recognition: [
				"open", "open document", "open file", "open an image file", "open a document", "open a file",
				"load document", "load a document", "load an image file", "load an image",
				"show file picker", "show file chooser", "show file browser", "show finder",
				"browser for file", "browse for a file", "browse for an image", "browse for an image file",
			],
			action: ()=> { file_open(); },
			description: localize("Opens an existing document."),
		},
		{
			item: localize("&Save"),
			shortcut: "Ctrl+S",
			speech_recognition: [
				"save", "save document", "save file", "save image", "save picture", "save image file",
				// "save a document", "save a file", "save an image", "save an image file", // too "save as"-like
				"save the document", "save the file", "save the image", "save the image file",

				"download", "download document", "download file", "download image", "download picture", "download image file",
				"download the document", "download the file", "download the image", "download the image file",
			],
			action: ()=> { file_save(); },
			description: localize("Saves the active document."),
		},
		{
			item: localize("Save &As"),
			// in mspaint, no shortcut is listed; it supports F12 (but in a browser that opens the dev tools)
			// it doesn't support Ctrl+Shift+S but that's a good & common modern shortcut
			shortcut: "Ctrl+Shift+S",
			speech_recognition: [
				// this is ridiculous
				// this would be really simple in JSGF format
				"save as", "save as a new file", "save as a new picture", "save as a new image", "save a new file", "save new file",
				"save a new document", "save a new image file", "save a new image", "save a new picture",
				"save as a copy", "save a copy", "save as copy", "save under a new name", "save with a new name",
				"save document as a copy", "save document copy", "save document as copy", "save document under a new name", "save document with a new name",
				"save image as a copy", "save image copy", "save image as copy", "save image under a new name", "save image with a new name",
				"save file as a copy", "save file copy", "save file as copy", "save file under a new name", "save file with a new name",
				"save image file as a copy", "save image file copy", "save image file as copy", "save image file under a new name", "save image file with a new name",
			],
			action: ()=> { file_save_as(); },
			description: localize("Saves the active document with a new name."),
		},
		MENU_DIVIDER,
		{
			item: localize("&Load From URL"),
			// shortcut: "Ctrl+L",
			speech_recognition: [
				"load from url",
				"load from a url",
				"load from address",
				"load from an address",
				"load from a web address",
				// this is ridiculous
				// this would be really simple in JSGF format
				"load an image from a URL",
				"load an image from an address",
				"load an image from a web address",
				"load image from a URL",
				"load image from an address",
				"load image from a web address",
				"load an image from URL",
				"load an image from address",
				"load an image from web address",
				"load image from URL",
				"load image from address",
				"load image from web address",

				"load an picture from a URL",
				"load an picture from an address",
				"load an picture from a web address",
				"load picture from a URL",
				"load picture from an address",
				"load picture from a web address",
				"load an picture from URL",
				"load an picture from address",
				"load an picture from web address",
				"load picture from URL",
				"load picture from address",
				"load picture from web address",
			],
			action: ()=> { file_load_from_url(); },
			description: localize("Opens an image from the web."),
		},
		{
			item: localize("&Upload To Imgur"),
			speech_recognition: [
				"upload to imgur", "upload image to imgur", "upload picture to imgur",
			],
			action: ()=> {
				// include the selection in the saved image
				deselect();

				main_canvas.toBlob((blob)=> {
					sanity_check_blob(blob, ()=> {
						show_imgur_uploader(blob);
					});
				});
			},
			description: localize("Uploads the active document to Imgur"),
		},
		MENU_DIVIDER,
		{
			item: localize("Manage Storage"),
			speech_recognition: [
				"manage storage", "show storage", "open storage window", "manage sessions", "show sessions", "show local sessions", "local sessions", "storage manager", "show storage manager", "open storage manager",
				"show autosaves", "show saves", "show saved documents", "show saved files", "show saved pictures", "show saved images", "show local storage",
				"autosaves", "autosave", "saved documents", "saved files", "saved pictures", "saved images", "local storage",
			],
			action: ()=> { manage_storage(); },
			description: localize("Manages storage of previously created or opened pictures."),
		},
		MENU_DIVIDER,
		{
			item: localize("Print Pre&view"),
			speech_recognition: [
				"preview print", "print preview", "show print preview", "show preview of print",
			],
			action: ()=> {
				print();
			},
			description: localize("Prints the active document and sets printing options."),
			//description: localize("Displays full pages."),
		},
		{
			item: localize("Page Se&tup"),
			speech_recognition: [
				"setup page for print", "setup page for printing", "set-up page for print", "set-up page for printing", "set up page for print", "set up page for printing",
				"page setup", "printing setup", "page set-up", "printing set-up", "page set up", "printing set up",
			],
			action: ()=> {
				print();
			},
			description: localize("Prints the active document and sets printing options."),
			//description: localize("Changes the page layout."),
		},
		{
			item: localize("&Print"),
			shortcut: "Ctrl+P",
			speech_recognition: [
				"print", "send to printer", "show print dialog",
				"print page", "print image", "print picture", "print drawing",
				"print out page", "print out image", "print out picture", "print out drawing", 
				"print out the page", "print out the image", "print out the picture", "print out the drawing", 

				"send page to printer", "send image to printer", "send picture to printer", "send drawing to printer", 
				"send page to the printer", "send image to the printer", "send picture to the printer", "send drawing to the printer", 
				"send the page to the printer", "send the image to the printer", "send the picture to the printer", "send the drawing to the printer", 
				"send the page to printer", "send the image to printer", "send the picture to printer", "send the drawing to printer", 
			],
			action: ()=> {
				print();
			},
			description: localize("Prints the active document and sets printing options."),
		},
		MENU_DIVIDER,
		{
			item: localize("Set As &Wallpaper (Tiled)"),
			speech_recognition: [
				"set as wallpaper",
				"set as wallpaper tiled",
				"set image as wallpaper tiled", "set picture as wallpaper tiled", "set drawing as wallpaper tiled", 
				"use as wallpaper tiled",
				"use image as wallpaper tiled", "use picture as wallpaper tiled", "use drawing as wallpaper tiled", 
				"tile image as wallpaper", "tile picture as wallpaper", "tile drawing as wallpaper", 
			],
			action: ()=> { systemHooks.setWallpaperTiled(main_canvas); },
			description: localize("Tiles this bitmap as the desktop background."),
		},
		{
			item: localize("Set As Wallpaper (&Centered)"), // in mspaint it's Wa&llpaper
			speech_recognition: [
				"set as wallpaper centered",
				"set image as wallpaper centered", "set picture as wallpaper centered", "set drawing as wallpaper centered", 
				"use as wallpaper centered",
				"use image as wallpaper centered", "use picture as wallpaper centered", "use drawing as wallpaper centered", 
				"center image as wallpaper", "center picture as wallpaper", "center drawing as wallpaper", 
			],
			action: ()=> { systemHooks.setWallpaperCentered(main_canvas); },
			description: localize("Centers this bitmap as the desktop background."),
		},
		MENU_DIVIDER,
		{
			item: localize("Recent File"),
			enabled: false, // @TODO for desktop app
			description: localize(""),
		},
		
	],
	[localize("&Edit")]: [
		{
			item: localize("&Undo"),
			shortcut: "Ctrl+Z",
			speech_recognition: [
				"undo", "undo that",
			],
			enabled: () => undos.length >= 1,
			action: ()=> { undo(); },
			description: localize("Undoes the last action."),
		},
		{
			item: localize("&Repeat"),
			shortcut: "F4",
			speech_recognition: [
				"repeat", "redo",
			],
			enabled: () => redos.length >= 1,
			action: ()=> { redo(); },
			description: localize("Redoes the previously undone action."),
		},
		{
			item: localize("&History"),
			shortcut: "Ctrl+Shift+Y",
			speech_recognition: [
				"show history", "history",
			],
			action: ()=> { show_document_history(); },
			description: localize("Shows the document history and lets you navigate to states not accessible with Undo or Repeat."),
		},
		MENU_DIVIDER,
		{
			item: localize("Cu&t"),
			shortcut: "Ctrl+X",
			speech_recognition: [
				"cut", "cut selection", "cut selection to clipboard", "cut the selection", "cut the selection to clipboard", "cut the selection to the clipboard",
			],
			enabled: () =>
				// @TODO: support cutting text with this menu item as well (e.g. for the text tool)
				!!selection,
			action: ()=> {
				edit_cut(true);
			},
			description: localize("Cuts the selection and puts it on the Clipboard."),
		},
		{
			item: localize("&Copy"),
			shortcut: "Ctrl+C",
			speech_recognition: [
				"copy", "copy selection", "copy selection to clipboard", "copy the selection", "copy the selection to clipboard", "copy the selection to the clipboard",
			],
			enabled: () =>
				// @TODO: support copying text with this menu item as well (e.g. for the text tool)
				!!selection,
			action: ()=> {
				edit_copy(true);
			},
			description: localize("Copies the selection and puts it on the Clipboard."),
		},
		{
			item: localize("&Paste"),
			shortcut: "Ctrl+V",
			speech_recognition: [
				"paste", "paste from clipboard", "paste from the clipboard", "insert clipboard", "insert clipboard contents", "insert the contents of the clipboard", "paste what's on the clipboard",
			],
			enabled: () =>
				// @TODO: disable if nothing in clipboard or wrong type (if we can access that)
				true,
			action: ()=> {
				edit_paste(true);
			},
			description: localize("Inserts the contents of the Clipboard."),
		},
		{
			item: localize("C&lear Selection"),
			shortcut: "Del",
			speech_recognition: [
				"delete", "clear selection", "delete selection", "delete selected", "delete selected area", "clear selected area", "erase selected", "erase selected area",
			],
			enabled: () => !!selection,
			action: ()=> { delete_selection(); },
			description: localize("Deletes the selection."),
		},
		{
			item: localize("Select &All"),
			shortcut: "Ctrl+A",
			speech_recognition: [
				"select all", "select everything",
				"select the whole image", "select the whole picture", "select the whole drawing", "select the whole canvas", "select the whole document",
				"select the entire image", "select the entire picture", "select the entire drawing", "select the entire canvas", "select the entire document",
			],
			action: ()=> { select_all(); },
			description: localize("Selects everything."),
		},
		MENU_DIVIDER,
		{
			item: `${localize("C&opy To")}...`,
			speech_recognition: [
				"copy to file", "copy selection to file", "copy selection to a file", "save selection", 
				"save selection as file", "save selection as image", "save selection as picture", "save selection as image file", "save selection as document",
				"save selection as a file", "save selection as a image", "save selection as a picture", "save selection as a image file", "save selection as a document",
				"save selection to file", "save selection to image", "save selection to picture", "save selection to image file", "save selection to document",
				"save selection to a file", "save selection to a image", "save selection to a picture", "save selection to a image file", "save selection to a document",
			],
			enabled: () => !!selection,
			action: ()=> { save_selection_to_file(); },
			description: localize("Copies the selection to a file."),
		},
		{
			item: `${localize("Paste &From")}...`,
			speech_recognition: [
				"paste a file", "paste from a file", "insert a file", "insert an image file", 
			],
			action: ()=> { choose_file_to_paste(); },
			description: localize("Pastes a file into the selection."),
		}
	],
	[localize("&View")]: [
		{
			item: localize("&Tool Box"),
			// shortcut: "Ctrl+T", // opens a new browser tab
			speech_recognition: [
				"toggle tool box", "toggle tools box", "toggle toolbox", "toggle tool palette", "toggle tools palette",
				// @TODO: hide/show
			],
			checkbox: {
				toggle: ()=> {
					$toolbox.toggle();
				},
				check: () => $toolbox.is(":visible"),
			},
			description: localize("Shows or hides the tool box."),
		},
		{
			item: localize("&Color Box"),
			// shortcut: "Ctrl+L", // focuses browser address bar
			speech_recognition: [
				"toggle color box", "toggle colors box", "toggle palette", "toggle color palette", "toggle colors palette",
				// @TODO: hide/show
			],
			checkbox: {
				toggle: ()=> {
					$colorbox.toggle();
				},
				check: () => $colorbox.is(":visible"),
			},
			description: localize("Shows or hides the color box."),
		},
		{
			item: localize("&Status Bar"),
			speech_recognition: [
				"toggle status bar", "toggle status text", "toggle status area", "toggle status indicator",
				// @TODO: hide/show
			],
			checkbox: {
				toggle: ()=> {
					$status_area.toggle();
				},
				check: () => $status_area.is(":visible"),
			},
			description: localize("Shows or hides the status bar."),
		},
		{
			item: localize("T&ext Toolbar"),
			speech_recognition: [
				"toggle text toolbar", "toggle font toolbar", "toggle text tool bar", "toggle font tool bar",
				"toggle font box", "toggle fonts box", "toggle text options box", "toggle text tool options box", "toggle font options box",
				"toggle font window", "toggle fonts window", "toggle text options window", "toggle text tool options window", "toggle font options window",
				// @TODO: hide/show
			],
			enabled: false, // @TODO: toggle fonts box
			checkbox: {},
			description: localize("Shows or hides the text toolbar."),
		},
		MENU_DIVIDER,
		{
			item: localize("&Zoom"),
			submenu: [
				{
					item: localize("&Normal Size"),
					// shortcut: "Ctrl+PgUp", // cycles thru browser tabs
					speech_recognition: [
						"reset zoom", "zoom to normal size",
						"zoom to 100%", "set zoom to 100%", "set zoom 100%",
						"zoom to 1x", "set zoom to 1x", "set zoom 1x",
						"zoom level to 100%", "set zoom level to 100%", "set zoom level 100%",
						"zoom level to 1x", "set zoom level to 1x", "set zoom level 1x",
					],
					description: localize("Zooms the picture to 100%."),
					enabled: () => magnification !== 1,
					action: ()=> {
						set_magnification(1);
					},
				},
				{
					item: localize("&Large Size"),
					// shortcut: "Ctrl+PgDn", // cycles thru browser tabs
					speech_recognition: [
						"zoom to large size",
						"zoom to 400%", "set zoom to 400%", "set zoom 400%",
						"zoom to 4x", "set zoom to 4x", "set zoom 4x",
						"zoom level to 400%", "set zoom level to 400%", "set zoom level 400%",
						"zoom level to 4x", "set zoom level to 4x", "set zoom level 4x",
					],
					description: localize("Zooms the picture to 400%."),
					enabled: () => magnification !== 4,
					action: ()=> {
						set_magnification(4);
					},
				},
				{
					item: localize("Zoom To &Window"),
					speech_recognition: [
						"zoom to window", "zoom to view",
						"zoom to fit",
						"zoom to fit within window", "zoom to fit within view",
						"zoom to fit within the window", "zoom to fit within the view",
						"zoom to fit in window", "zoom to fit in view",
						"zoom to fit in the window", "zoom to fit in the view",
						"auto zoom", "fit zoom",
						"zoom to max", "zoom to maximum", "zoom to max size", "zoom to maximum size",
						"zoom so canvas fits", "zoom so picture fits", "zoom so image fits", "zoom so document fits",
						"zoom so whole canvas is visible", "zoom so whole picture is visible", "zoom so whole image is visible", "zoom so whole document is visible",
						"zoom so the whole canvas is visible", "zoom so the whole picture is visible", "zoom so the whole image is visible", "zoom so the whole document is visible",
						
						"fit to window", "fit to view", "fit in window", "fit in view", "fit within window", "fit within view",
						"fit picture to window", "fit picture to view", "fit picture in window", "fit picture in view", "fit picture within window", "fit picture within view",
						"fit image to window", "fit image to view", "fit image in window", "fit image in view", "fit image within window", "fit image within view",
						"fit canvas to window", "fit canvas to view", "fit canvas in window", "fit canvas in view", "fit canvas within window", "fit canvas within view",
						"fit document to window", "fit document to view", "fit document in window", "fit document in view", "fit document within window", "fit document within view",
					],
					description: localize("Zooms the picture to fit within the view."),
					action: ()=> {
						const rect = $canvas_area[0].getBoundingClientRect();
						const margin = 30; // leave a margin so scrollbars won't appear
						let mag = Math.min(
							(rect.width - margin) / main_canvas.width,
							(rect.height - margin) / main_canvas.height,
						);
						// round to an integer percent for the View > Zoom > Custom... dialog, which shows non-integers as invalid
						mag = Math.floor(100 * mag) / 100;
						set_magnification(mag);
					},
				},
				{
					item: `${localize("C&ustom")}...`,
					description: localize("Zooms the picture."),
					speech_recognition: [
						"zoom custom", "custom zoom", "set custom zoom", "set custom zoom level", "zoom to custom level", "zoom to custom", "zoom level", "set zoom level",
					],
					action: ()=> { show_custom_zoom_window(); },
				},
				MENU_DIVIDER,
				{
					item: localize("Show &Grid"),
					shortcut: "Ctrl+G",
					speech_recognition: [
						"toggle show grid",
						"toggle grid", "toggle gridlines", "toggle grid lines", "toggle grid cells",
						// @TODO: hide/show
					],
					enabled: () => magnification >= 4,
					checkbox: {
						toggle: () => { toggle_grid(); },
						check: () => show_grid,
					},
					description: localize("Shows or hides the grid."),
				},
				{
					item: localize("Show T&humbnail"),
					speech_recognition: [
						"toggle show thumbnail",
						"toggle thumbnail", "toggle thumbnail view", "toggle thumbnail box", "toggle thumbnail window",
						"toggle preview", "toggle image preview", "toggle picture preview",
						"toggle picture in picture", "toggle picture in picture view", "toggle picture in picture box", "toggle picture in picture window",
						// @TODO: hide/show
					],
					checkbox: {
						toggle: () => { toggle_thumbnail(); },
						check: () => show_thumbnail,
					},
					description: localize("Shows or hides the thumbnail view of the picture."),
				}
			]
		},
		{
			item: localize("&View Bitmap"),
			shortcut: "Ctrl+F",
			speech_recognition: [
				"view bitmap", "show bitmap",
				"fullscreen", "full-screen", "full screen",
				"show picture fullscreen", "show picture full-screen", "show picture full screen",
				"show image fullscreen", "show image full-screen", "show image full screen",
				// @TODO: exit fullscreen
			],
			action: ()=> { view_bitmap(); },
			description: localize("Displays the entire picture."),
		},
		MENU_DIVIDER,
		{
			item: localize("&Fullscreen"),
			shortcut: "F11",
			speech_recognition: [
				// won't work with speech recognition, needs a user gesture
			],
			checkbox: {
				check: () => document.fullscreenElement,
				toggle: () => {
					if (document.fullscreenElement) {
						document.exitFullscreen();
					} else {
						document.documentElement.requestFullscreen();
					}
					// check() would need to be async or faked with a timeout,
					// if the menus stayed open. @TODO: make all checkboxes close menus
					menu_bar.closeMenus();
				},
			},
			description: localize("Makes the application take up the entire screen."),
		},
	],
	[localize("&Image")]: [
		// @TODO: speech recognition: terms that apply to selection
		{
			item: localize("&Flip/Rotate"),
			// shortcut: "Ctrl+R", // reloads browser tab
			speech_recognition: [
				"flip",
				"rotate",
				"flip/rotate", "flip slash rotate", "flip and rotate", "flip or rotate", "flip rotate",
				// @TODO: parameters to command
			],
			action: ()=> { image_flip_and_rotate(); },
			description: localize("Flips or rotates the picture or a selection."),
		},
		{
			item: localize("&Stretch/Skew"),
			// shortcut: "Ctrl+W", // closes browser tab
			speech_recognition: [
				"stretch", "scale", "resize image",
				"skew",
				"stretch/skew", "stretch slash skew", "stretch and skew", "stretch or skew", "stretch skew",
				// @TODO: parameters to command
			],
			action: ()=> { image_stretch_and_skew(); },
			description: localize("Stretches or skews the picture or a selection."),
		},
		{
			item: localize("&Invert Colors"),
			shortcut: "Ctrl+I",
			speech_recognition: [
				"invert",
				"invert colors",
				"invert image", "invert picture", "invert drawing",
				"invert image colors", "invert picture colors", "invert drawing colors",
				"invert colors of image", "invert colors of picture", "invert colors of drawing",
			],
			action: ()=> { image_invert_colors(); },
			description: localize("Inverts the colors of the picture or a selection."),
		},
		{
			item: `${localize("&Attributes")}...`,
			shortcut: "Ctrl+E",
			speech_recognition: [
				"attributes", "image attributes", "picture attributes", "image options", "picture options",
				"dimensions", "image dimensions", "picture dimensions",
				"resize canvas", "resize document", "resize page", // not resize image/picture because that implies scaling, handled by Stretch/Skew
				"set image size", "set picture size", "set canvas size", "set document size", "set page size",
				"image size", "picture size", "canvas size", "document size", "page size",
				"configure image size", "configure picture size", "configure canvas size", "configure document size", "configure page size",
			],
			action: ()=> { image_attributes(); },
			description: localize("Changes the attributes of the picture."),
		},
		{
			item: localize("&Clear Image"),
			shortcut: looksLikeChrome ? undefined : "Ctrl+Shift+N", // opens incognito window in chrome
			speech_recognition: [
				"clear image", "clear canvas", "clear picture", "clear page", "clear drawing",
				// @TODO: erase?
			],
			// (mspaint says "Ctrl+Shft+N")
			action: ()=> { !selection && clear(); },
			enabled: ()=> !selection,
			description: localize("Clears the picture."),
			// action: ()=> {
			// 	if (selection) {
			// 		delete_selection();
			// 	} else {
			// 		clear();
			// 	}
			// },
			// mspaint says localize("Clears the picture or selection."), but grays out the option when there's a selection
		},
		{
			item: localize("&Draw Opaque"),
			speech_recognition: [
				"toggle draw opaque",
				"toggle transparent selection", "toggle transparent selections",
				"toggle transparent selection mode", "toggle transparent selections mode",
				"toggle opaque selection", "toggle opaque selections",
				"toggle opaque selection mode", "toggle opaque selections mode",
				// toggle opaque? toggle opacity?
				// @TODO: hide/show / "draw opaque" / "draw transparent"/translucent?
			],
			checkbox: {
				toggle: ()=> {
					tool_transparent_mode = !tool_transparent_mode;
					$G.trigger("option-changed");
				},
				check: () => !tool_transparent_mode,
			},
			description: localize("Makes the current selection either opaque or transparent."),
		}
	],
	[localize("&Colors")]: [
		{
			item: `${localize("&Edit Colors")}...`,
			speech_recognition: [
				"edit colors", "edit color", "edit custom colors", "edit custom color",
				"pick custom color", "choose custom color", "pick a custom color", "choose a custom color",
				"edit last color", "create new color", "choose new color", "create a new color", "pick a new color",
			],
			action: ()=> {
				show_edit_colors_window();
			},
			description: localize("Creates a new color."),
		},
		{
			item: localize("&Get Colors"),
			speech_recognition: [
				"get colors", "load colors", "load color palette", "load palette", "load color palette file", "load palette file", "load list of colors",
			],
			action: async ()=> {
				const {file} = await systemHooks.showOpenFileDialog({formats: palette_formats});
				AnyPalette.loadPalette(file, (error, new_palette)=> {
					if (error) {
						show_file_format_errors({ as_palette_error: error });
					} else {
						palette = new_palette.map((color)=> color.toString());
						$colorbox.rebuild_palette();
						window.console && console.log(`Loaded palette: ${palette.map(()=> `%c█`).join("")}`, ...palette.map((color)=> `color: ${color};`));
					}
				});
			},
			description: localize("Uses a previously saved palette of colors."),
		},
		{
			item: localize("&Save Colors"),
			speech_recognition: [
				"save colors", "save list of colors", "save color palette", "save palette", "save color palette file", "save palette file",
			],
			action: ()=> {
				const ap = new AnyPalette.Palette();
				ap.name = "JS Paint Saved Colors";
				ap.numberOfColumns = 16; // 14?
				for (const color of palette) {
					const [r, g, b] = get_rgba_from_color(color);
					ap.push(new AnyPalette.Color({
						red: r / 255,
						green: g / 255,
						blue: b / 255,
					}));
				}
				systemHooks.showSaveFileDialog({
					dialogTitle: localize("Save Colors"),
					defaultFileName: localize("untitled.pal"),
					formats: palette_formats,
					getBlob: ()=> {
						const file_content = AnyPalette.writePalette(ap, AnyPalette.formats[format_id]);
						const blob = new Blob([file_content], {type: "text/plain"});
						return new Promise((resolve)=> {
							sanity_check_blob(blob, ()=> {
								resolve(blob);
							});
						});
					},
				});
			},
			description: localize("Saves the current palette of colors to a file."),
		}
	],
};

for (const [top_level_menu_key, menu] of Object.entries(menus)) {
	const top_level_menu_name = top_level_menu_key.replace(/&/, "");
	const add_literal_navigation_speech_recognition = (menu, ancestor_names)=> {
		for (const menu_item of menu) {
			if (menu_item !== MENU_DIVIDER) {
				const menu_item_name = menu_item.item.replace(/&|\.\.\.|\(|\)/g, "");
				// console.log(menu_item_name);
				let menu_item_matchers = [menu_item_name];
				if (menu_item_name.match(/\//)) {
					menu_item_matchers = [
						menu_item_name,
						menu_item_name.replace(/\//, " "),
						menu_item_name.replace(/\//, " and "),
						menu_item_name.replace(/\//, " or "),
						menu_item_name.replace(/\//, " slash "),
					];
				}
				menu_item_matchers = menu_item_matchers.map((menu_item_matcher)=> {
					return `${ancestor_names} ${menu_item_matcher}`;
				});
				menu_item.speech_recognition = (menu_item.speech_recognition || []).concat(menu_item_matchers);
				// console.log(menu_item_matchers, menu_item.speech_recognition);

				if (menu_item.submenu) {
					add_literal_navigation_speech_recognition(menu_item.submenu, `${ancestor_names} ${menu_item_name}`);
				}
			}
		}
	};
	add_literal_navigation_speech_recognition(menu, top_level_menu_name);
}

})();
