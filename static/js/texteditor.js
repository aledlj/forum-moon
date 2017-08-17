var texteditor = {};

//call texteditor.create

texteditor.create = function(elem, Callback) {
    var $elem = $(elem);

    var cb = function () {
        var a = new texteditor.Editor($elem);
        if (Callback) Callback(a);
    };

    var fail = function () {
        console.log("failed");
    };

    $.when(this).then(cb, fail);
};

texteditor.Editor = function($elem) {

    var $buttons = this._createButtons($elem);

    $elem.prepend($buttons);

};

texteditor.Editor.prototype = {

    update: function () {

    },

    _generateFormatting: function () {

    },

    /*_create: function () {

    },*/

    _createButtons: function ($elem) {
        /*
        structure:

        <a href="#" title="Bold" onclick="markdownFormat('.replybox', '.replybox-preview', 'bold'); return false;">
        <div class="texteditbutton"><i class="fa fa-bold"></i></div>
        </a>
        */

        var texteditorbuttons = {
            "Bold": ["bold","fa-bold"],
            "Italic": ["italic","fa-italic"],
            "Strikethrough": ["strikethrough","fa-strikethrough"],
            "Heading": ["heading","fa-header", true],
            "Blockquote": ["blockquote","fa-quote-left"],
            "Divider": ["hr","fa-minus"],
            "Code": ["code","fa-code"],
            "List": ["list","fa-list"],
            "Ordered list": ["ol-list","fa-list-ol"],
            "Table": ["table","fa-table"],
            "Link": ["link","fa-link"],
            "Image (embed link)": ["image","fa-image"],
            "YouTube (embed link)": ["youtube","fa-youtube-play"],
            "Guide": [false,"fa-question", false, "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"]
        };

        var $buttonlist = $("<div>", {id: "texteditbuttons"});

        var $this = this;

        $.each(texteditorbuttons, function(name, value){
            //value[0] = action link
            //value[1] = icon
            //value[2] = create menu
            //value[3] = link (if not action)

            var action      = value[0];
            var icon        = value[1];
            var createmenu  = value[2];
            var link        = value[3];

            if (!link) {
                link = "#";
            }

            var $button = $("<a>", {href: link, title: name});
            var $innerbutton = $("<div>", {"class": "texteditbutton"});

            if (action) {
                $innerbutton.attr('id', action);
                $innerbutton.on('click', 'a', function(event) {
                    event.preventDefault();
                    $this._action(action);
                    console.log("a");
                });
            }

            if (createmenu) {
                $this._createMenu($elem, action);
            }

            var $icon = $("<i>", {"class": "fa "+icon});

            $innerbutton.append($icon);
            $button.append($innerbutton);
            $buttonlist.append($button);
        });

        return $buttonlist;
    },

    _createMenu: function($elem, action) {
        //structure: <li><a href="#" onclick="textbox.update('elem', 'h6'); return false;"><h6>Heading 6</h6></a></li>

        var $this = this;
        var found = false;
        var menus = {
            "heading": {
                "Heading 1":["tag","h1"],
                "Heading 2":["tag","h2"],
                "Heading 3":["tag","h3"],
                "Heading 4":["tag","h4"],
                "Heading 5":["tag","h5"],
                "Heading 6":["tag","h6"]
            }
        };

        $.each(menus, function(name, value) { // heading
            if (action == name) {
                var $menulist = $("<ul>", {"class": "texteditormenu "+name});

                $.each(menus[name], function(namein, valuein) { // Heading 0
                    var type = valuein[0]; // tag
                    var typeval = valuein[1]; // h0

                    if (type == "tag") {
                        var $listitem = $("<li>");
                        var $item = $("<a>", {href: "#", onclick:"textbox.update('elem', '"+typeval+"'); return false;"});
                        var $heading = $("<"+typeval+">").text(namein);

                        $item.append($heading);
                        $listitem.append($item);
                        $menulist.append($listitem);
                    }
                });

                var $menuElement = $(".texteditormenu." + name);
                var $menuButtonElement = $( ".texteditbutton." + name);

                var handler = function(event){
                    var menuShowing = $menuElement.data("menuShowing");
                    if ($(event.target).is($menuElement)) return;
                    if ($(event.target).is($menuButtonElement)) return;
                    if (menuShowing) {
                        $this._toggleMenu(name);
                    }
                };

                $(document).click(handler);

                $elem.append($menulist);
            }
        });
    },

    _toggleMenu: function(action) {

    },

    _createTextBox: function(action) {

    },

    _action: function(action) {

    },
};

function toggleEditorMenu(menu) {
    var $menuElement = $(".texteditormenu." + menu);
    var menuShowing = $menuElement.data("menuShowing");
    var busy = $menuElement.data("busy");

    var $menuButtonElement = $( ".texteditbutton." + menu);
    var menuButtonPosition = $menuButtonElement.position();
    var menuButtonOuterHeight = $menuButtonElement.outerHeight();

    if (!busy) {
        $menuElement.data("busy", 1);
        if (!menuShowing) {
            $menuElement.css({"top": menuButtonPosition.top+menuButtonOuterHeight, "left": menuButtonPosition.left});
            $menuElement.show();
            $menuElement.velocity({opacity:1}, 100, "linear", function(){
                $menuElement.data("busy", 0);
            });
            $menuElement.data("menuShowing", 1);
            //$( ".menubutton" ).addClass('menubuttonactivated');
        } else {
            $( ".texteditormenu." + menu ).velocity({opacity:0}, 100, "linear", function(){
                $( ".texteditormenu." + menu ).hide();
                $menuElement.data("menuShowing", 0);
                $menuElement.data("busy", 0);
            });
        }
    }
}

function currentLine(textarea) {
    var $ta = $(textarea),
        pos = $ta.textrange('get', 'start'), // fieldselection jQuery plugin
        taval = $ta.val(),
        start = taval.lastIndexOf('\n', pos - 1) + 1,
        end = taval.indexOf('\n', pos);
    
    if (end == -1) {
        end = taval.length;   
    }
    
    return taval.substr(start, end - start);
}

/*var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}*/

function updateMarkdownPreview(elem, previewTarget) {

    var elemText = $(elem).val(); //escapeHtml();
    var elemLastVal = $(elem).data("lastval");

    if (elemLastVal != elemText) {
        $(elem).data("lastval",elemText);
        //console.log($(this).val());

        var youtuberegex = /(\!\[:youtube\]\(([^\)]+)\))/gm;

        var youtubereplace = '<iframe width="600" height="400" style="max-width: 100%;" src="http://www.youtube.com/embed/$1?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>';

        //var sanitize = html_sanitize(elemText);
        var elemMarkdownPreview = marked(elemText.replace(youtuberegex,youtubereplace));
        $(previewTarget).html(elemMarkdownPreview);
    }
}

function markdownFormat(textbox, previewTarget, format) {
    var selection = $(textbox).textrange('get', 'text');
    var selLength = $(textbox).textrange('get', 'length');
    var selStartPos = $(textbox).textrange('get', 'start');
    var selEndPos = $(textbox).textrange('get', 'end');
    var cursorPosition = $(textbox).textrange('get', 'position');
    var currentLineText = currentLine(textbox);
    var determineNewLine = "";
    var determineNewSpace = "";

    if (currentLineText) {
        determineNewLine = "\n";
        determineNewSpace = " ";
    }


    //console.log("text: " + selection + ", length: " + selLength);

    if (selection === "") {
        
        if (format == "bold") {
            document.execCommand("insertText", false, "**Bold**");
            //$(textbox).textrange('insert', '**Bold**');
            $(textbox).textrange('set', -6, -2);
        }
        if (format == "italic") {
            document.execCommand("insertText", false, "*Italic*");
            $(textbox).textrange('set', -7, -1);
        }
        if (format == "strikethrough") {
            document.execCommand("insertText", false, "~~Strikethrough~~");
            $(textbox).textrange('set', -15, -2);
        }
        if (format == "h1") {
            document.execCommand("insertText", false, determineNewLine + '# Heading');
            $(textbox).textrange('set', -7);
        }
        if (format == "h2") {
            document.execCommand("insertText", false, determineNewLine + '## Heading');
            $(textbox).textrange('set', -7);
        }
        if (format == "h3") {
            document.execCommand("insertText", false, determineNewLine + '### Heading');
            $(textbox).textrange('set', -7);
        }
        if (format == "h4") {
            document.execCommand("insertText", false, determineNewLine + '#### Heading');
            $(textbox).textrange('set', -7);
        }
        if (format == "h5") {
            document.execCommand("insertText", false, determineNewLine + '##### Heading');
            $(textbox).textrange('set', -7);
        }
        if (format == "h6") {
            document.execCommand("insertText", false, determineNewLine + '###### Heading');
            $(textbox).textrange('set', -7);
        }
        if (format == "blockquote") {
            document.execCommand("insertText", false, determineNewLine + '> Blockquote');
            $(textbox).textrange('set', -10);
        }
        if (format == "code") {
            document.execCommand("insertText", false, determineNewLine + '````\nCode\n````');
            $(textbox).textrange('set', -9, -5);
        }
        if (format == "hr") {
            document.execCommand("insertText", false, '\n***\n');
            $(textbox).textrange('setcursor', (cursorPosition + 5));
        }
        if (format == "list") {
            document.execCommand("insertText", false, determineNewLine + '- List');
            $(textbox).textrange('set', -4);
        }
        if (format == "ol-list") {
            document.execCommand("insertText", false, determineNewLine + '1. Ordered list');
            $(textbox).textrange('set', -12);
        }
        if (format == "table") {
            document.execCommand("insertText", false, determineNewLine + 'Table  | Column 2 | Centered | Right align\n-------|----------|:--------:| -----------:\nA      | D        | G        | J\nB      | E        | H        | K\nC      | F        | I        | L');
            //$(textbox).textrange('set', -12);
        }
        if (format == "link") {
            document.execCommand("insertText", false, determineNewSpace + '[text](http://link.com)');
            $(textbox).textrange('set', -22, -18);
        }
        if (format == "image") {
            document.execCommand("insertText", false, determineNewSpace + '![alt text](http://vidze.co.uk/images/avatars/default.jpg)');
            $(textbox).textrange('set', -46, -1);
        }
        if (format == "youtube") {
            document.execCommand("insertText", false, determineNewSpace + '![:youtube](jNQXAC9IVRw)');
            $(textbox).textrange('set', -12, -1);
        }
    } else {
        if (format == "bold") {
            $(textbox).textrange('insert', '**' + selection + '**');
            $(textbox).textrange('set', ((-selLength) - 2), -2);
        }
        if (format == "italic") {
            $(textbox).textrange('insert', '*' + selection + '*');
            $(textbox).textrange('set', ((-selLength) - 1), -1);
        }
        if (format == "strikethrough") {
            $(textbox).textrange('insert', '~~' + selection + '~~');
            $(textbox).textrange('set', ((-selLength) - 4), -4);
        }
        if (format == "heading" || format == "h1") {
            if (currentLineText == "Heading") {
                $(textbox).textrange('setcursor', (-1));
            } else {
                $(textbox).textrange('insert', '# ' + selection);
                $(textbox).textrange('set', (-selLength));
            }
        }
    }

    //if (currentLineText == "1. Ordered list") {
                //$(textbox).textrange('insert', '\n2. Ordered list');
                //$(textbox).textrange('set', -12);

                // if (currentLineText == "- List") {
                // $(textbox).textrange('insert', '\n  - List');
                // $(textbox).textrange('set', -4);

    updateMarkdownPreview(textbox, previewTarget);
}