
var difficulty_levels = [
	[9, 9, 10],
	[16, 16, 40],
	[30, 16, 99]
];
var set_difficulty = function(difficulty){
	minesweeper_.new_game.apply(minesweeper_, difficulty);
	
	if(frameElement && frameElement.$window){
		// TODO: um why not just use the computed width <punctuation="thinking-emoji"/> </sentence>
		var tile_size = 16;
		var extra_width = 24;
		var extra_height = 64;
		frameElement.$window.setDimensions({
			innerWidth: extra_width + tile_size * difficulty[0],
			innerHeight: extra_height + tile_size * difficulty[1],
		});
	}
};
var is_at_difficulty = function(difficulty){
	return (
		minesweeper_.width === difficulty[0] &&
		minesweeper_.height === difficulty[1] &&
		minesweeper_.number_mines === difficulty[2]
	);
};
var checkbox_for_difficulty = function(index){
	return {
		check: function(){
			return is_at_difficulty(difficulty_levels[index]);
		},
		toggle: function(){
			set_difficulty(difficulty_levels[index]);
		},
	};
};

var menus = {
	"&Game": [
		{
			item: "&New",
			// shortcut: "F2", // TODO
			action: function(){
				minesweeper_.restart();
			},
		},
		MENU_DIVIDER,
		{
			item: "&Beginner",
			checkbox: checkbox_for_difficulty(0),
		},
		{
			item: "&Intermediate",
			checkbox: checkbox_for_difficulty(1),
		},
		{
			item: "&Expert",
			checkbox: checkbox_for_difficulty(2),
		},
		{
			item: "&Custom...",
			enabled: false,
			checkbox: {
				check: function(){
					return difficulty_levels.every(function(difficulty){
						return !is_at_difficulty(difficulty);
					});
				},
				toggle: function(){
					// TODO
					// minesweeper_.new_game(width, height, number_of_mines);
				},
			},
		},
		MENU_DIVIDER,
		{
			item: "&Marks (?)",
			enabled: false,
			checkbox: {
				check: function(){
					// TODO
					return true;
				},
				toggle: function(){
					// TODO
				},
			}
		},
		{
			item: "Co&lor",
			enabled: false,
			checkbox: {
				check: function(){
					// TODO
					return true;
				},
				toggle: function(){
					// TODO
				},
			}
		},
		MENU_DIVIDER,
		{
			item: "Best &Times...",
			enabled: false,
			action: function(){
				// TODO
			},
		},
		MENU_DIVIDER,
		{
			item: "E&xit",
			action: () => {
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
	rocket.ready(function() {
		document.body.prepend(menu_bar.element);
	});
}
