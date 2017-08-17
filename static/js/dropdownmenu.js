var i = 0;

function closeMenu(instant){
    if (instant == 1) {
        $( "#menumobile" ).css("opacity", "0");
        $( "#menumobile" ).hide();
    } else {
        $( "#menumobile" ).velocity({opacity:0}, 100, "linear", function(){
        	$( "#menumobile" ).hide();
        });
    }

    $( ".topbar-dropdownmenu-button" ).removeClass('topbar-dropdownmenu-button-activated');
    i = 0;
}

function mobilemenu(){
    if (i === 0){
        //open the menu
        //$( ".top" ).after( "<div id='menumobile'></div>" );
        $( "#menumobile" ).show();

        i++;
        $( "#menumobile" ).velocity({opacity:1}, 100, "linear");
        //$( ".menubutton" ).css("background-color", "#CCC");
        $( ".topbar-dropdownmenu-button" ).addClass('topbar-dropdownmenu-button-activated');

    } else {
        //close the menu
        closeMenu();
    }
}

var handler = function(event){
  // if the target is a descendent of container do nothing
  if($(event.target).is("#menumobile, #menumobile *")) return;
  //if($(event.target).is(".top, .top *")) return;
  if($(event.target).is(".topbar-dropdownmenu-button, .topbar-dropdownmenu-button *")) return;

  if (i==1){
    closeMenu();
  }
};

$(document).click(handler);
