window.Vidze or= {}

window.Vidze.Texteditor = class Texteditor
    constructor: ->
        @container = $("<div>", {
            class: "texteditor-container"
        })

        $buttons = @_createButtons()
        $textboxes = @_createTextboxes()

        @container.prepend $buttons
        @container.append $textboxes
        #@elem.prepend @container

        autosize @textboxarea

        $buttons.on 'click','.texteditbutton', (event) =>
            #console.log event.target
            $target = $(event.target)
            if not $target.parent().is("a")
                event.preventDefault()
                buttonaction = $target.attr 'id'
                menu = $target.hasClass "menu"
                @_action buttonaction, menu

        @textboxarea.on 'input', =>
            @_generateFormatting()

    object: ->
        # to interact with jquery
        return @container

    _createButtons: ->
        texteditorbuttons =
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
            "Guide": [false,"fa-question", false,
            "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"]

        $buttonlist = $("<div>", {id: "texteditbuttons"})
        @menulist = []

        $.each texteditorbuttons, (name, value) =>
            action      = value[0]
            icon        = value[1]
            createmenu  = value[2]
            link        = value[3]

            $icon = $("<i>", {"class": "fa "+icon})
                .css(
                    "pointer-events": "none"
                )

            if link
                $button = $("<div>", {class: "texteditbutton"})
                    .wrap("<a href='"+link+"' title='"+name+"' target='_blank'></a>")
                    .append $icon
                    .parent()
            else
                $button = $("<div>", {
                    class: "texteditbutton",
                    title: name,
                    role: "button"
                }).append $icon

            if action
                $button.attr 'id', action

            if createmenu
                @_createMenu action
                $button.addClass "menu"

            $buttonlist.append $button

            if createmenu
                $buttonlist.append @menu
                @menulist.push @menu

        return $buttonlist

    _createMenu: (action) ->
        menus =
            "heading":
                "Heading 1":["tag","h1"],
                "Heading 2":["tag","h2"],
                "Heading 3":["tag","h3"],
                "Heading 4":["tag","h4"],
                "Heading 5":["tag","h5"],
                "Heading 6":["tag","h6"]
        $.each menus, (name, value) =>
            if action is name
                $menu = $("<ul>", {class: "texteditormenu "+name})
                    .data("type",name)

                $.each menus[name], (namein, valuein) ->
                    type = valuein[0] # tag
                    typeval = valuein[1] # h0

                    if type is "tag"
                        $listitem = $("<li>")
                        $item = $("<a>", {
                            href: "#",
                            type: typeval
                        })

                        $heading = $("<"+typeval+">").css(
                            "pointer-events": "none"
                        ).text(namein)

                        $item.append $heading
                        $listitem.append $item
                        $menu.append $listitem

                $(document).click (event) =>
                    $target = $(event.target)
                    type = $menu.data 'type'
                    menuShowing = $menu.data "menuShowing"
                    return if $target.is $menu.find("a")
                    return if $target.is $(".texteditbutton#"+type)
                    @._toggleMenu type if menuShowing

                $menu.on 'click','a', (event) =>
                    event.preventDefault()
                    $target = $(event.target)
                    menuShowing = $menu.data "menuShowing"
                    type = $menu.data 'type'
                    tag = $target.attr 'type'
                    @_action tag, false
                    @_toggleMenu type if menuShowing
                return @menu = $menu


    _createTextboxes: ->
        @textboxcontainer = $("<div>", {id: "replybox-container"})
        @textboxarea = $("<textarea>", {name:"content", class: "replybox"})
        @textboxpreview = $("<div>", {class: "replybox-preview"})

        @textboxcontainer.append @textboxarea
        @textboxcontainer.append @textboxpreview

        return @textboxcontainer


    _toggleMenu: (type) ->
        $menuElement = $(".texteditormenu." + type)
        menuShowing = $menuElement.data("menuShowing")
        busy = $menuElement.data("busy")

        $menuButtonElement = $( ".texteditbutton#" + type)
        menuButtonPosition = $menuButtonElement.position()
        menuButtonOuterHeight = $menuButtonElement.outerHeight()

        if not busy
            $menuElement.data("busy", 1)

            if not menuShowing
                $menuElement.css {
                    "top": menuButtonPosition.top+menuButtonOuterHeight,
                    "left": menuButtonPosition.left
                }
                $menuElement.show()
                $menuElement.velocity {opacity:1}, 100, "linear", ->
                    $menuElement.data("busy", 0)

                $menuElement.data("menuShowing", 1)
                #$( ".menubutton" ).addClass('menubuttonactivated')
            else
                $menuElement.velocity {opacity:0}, 100, "linear", ->
                    $menuElement.hide()
                    $menuElement.data("menuShowing", 0)
                    $menuElement.data("busy", 0)



    _action: (buttonaction, menu) ->
        console.log menu
        if menu
            @_toggleMenu buttonaction
        else
            @_update buttonaction

    _getCurrentLine: ->
        pos = @textboxarea.textrange('get', 'start') # fieldselection plugin
        $textboxval = @textboxarea.val()
        start = $textboxval.lastIndexOf('\n', pos - 1) + 1
        end = $textboxval.indexOf('\n', pos)

        end = $textboxval.length if end is -1

        return $textboxval.substr(start, end - start)

    _update: (format) -> # markdownFormat
        selection = @textboxarea.textrange('get', 'text')
        selLength = @textboxarea.textrange('get', 'length')
        selStartPos = @textboxarea.textrange('get', 'start')
        selEndPos = @textboxarea.textrange('get', 'end')
        cursorPosition = @textboxarea.textrange('get', 'position')
        currentLineText = @_getCurrentLine(@textboxarea)
        determineNewLine = ""
        determineNewSpace = ""

        if currentLineText
            determineNewLine = "\n"
            determineNewSpace = " "

        #console.log("text: " + selection + ", length: " + selLength)

        if not selection
            if format == "bold"
                document.execCommand "insertText", false, "**Bold**"
                #@textboxarea.textrange'insert', '**Bold**'
                @textboxarea.textrange 'set', -6, -2

            if format == "italic"
                document.execCommand "insertText", false, "*Italic*"
                @textboxarea.textrange 'set', -7, -1

            if format == "strikethrough"
                document.execCommand "insertText", false, "~~Strikethrough~~"
                @textboxarea.textrange 'set', -15, -2

            if format == "h1"
                document.execCommand "insertText", false, determineNewLine + '# Heading'
                @textboxarea.textrange 'set', -7

            if format == "h2"
                document.execCommand "insertText", false, determineNewLine + '## Heading'
                @textboxarea.textrange 'set', -7

            if format == "h3"
                document.execCommand "insertText", false, determineNewLine + '### Heading'
                @textboxarea.textrange 'set', -7

            if format == "h4"
                document.execCommand "insertText", false, determineNewLine + '#### Heading'
                @textboxarea.textrange 'set', -7

            if format == "h5"
                document.execCommand "insertText", false, determineNewLine + '##### Heading'
                @textboxarea.textrange 'set', -7

            if format == "h6"
                document.execCommand "insertText", false, determineNewLine + '###### Heading'
                @textboxarea.textrange 'set', -7

            if format == "blockquote"
                document.execCommand "insertText", false, determineNewLine + '> Blockquote'
                @textboxarea.textrange 'set', -10

            if format == "code"
                document.execCommand "insertText", false, determineNewLine + '```language\nCode\n```'
                @textboxarea.textrange 'set', -8, -4

            if format == "hr"
                document.execCommand "insertText", false, '\n***\n'
                @textboxarea.textrange 'setcursor', cursorPosition + 5

            if format == "list"
                document.execCommand "insertText", false, determineNewLine + '- List'
                @textboxarea.textrange 'set', -4

            if format == "ol-list"
                document.execCommand "insertText", false, determineNewLine + '1. Ordered list'
                @textboxarea.textrange 'set', -12

            if format == "table"
                document.execCommand "insertText", false, determineNewLine + 'Table  | Column 2 | Centered | Right align\n-------|----------|:--------:| -----------:\nA      | D        | G        | J\nB      | E        | H        | K\nC      | F        | I        | L'
                #@textboxarea.textrange 'set', -12

            if format == "link"
                document.execCommand "insertText", false, determineNewSpace + '[text](http://link.com)'
                @textboxarea.textrange 'set', -22, -18

            if format == "image"
                document.execCommand "insertText", false, determineNewSpace + '![alt text](http://vidze.co.uk/images/avatars/default.jpg)'
                @textboxarea.textrange 'set', -46, -1

            if format == "youtube"
                document.execCommand "insertText", false, determineNewSpace + '![:youtube](jNQXAC9IVRw)'
                @textboxarea.textrange 'set', -12, -1

        else
            if format == "bold"
                @textboxarea.textrange('insert', '**' + selection + '**')
                @textboxarea.textrange('set', ((-selLength) - 2), -2)

            if format == "italic"
                @textboxarea.textrange('insert', '*' + selection + '*')
                @textboxarea.textrange('set', ((-selLength) - 1), -1)

            if format == "strikethrough"
                @textboxarea.textrange('insert', '~~' + selection + '~~')
                @textboxarea.textrange('set', ((-selLength) - 4), -4)

            if format == "heading" or format == "h1"
                if (currentLineText == "Heading")
                    @textboxarea.textrange('setcursor', (-1))
                else
                    @textboxarea.textrange('insert', '# ' + selection)
                    @textboxarea.textrange('set', (-selLength))

        #if (currentLineText == "1. Ordered list")
            #$(textbox).textrange('insert', '\n2. Ordered list');
            #$(textbox).textrange('set', -12);

        # if (currentLineText == "- List")
        # $(textbox).textrange('insert', '\n  - List');
        # $(textbox).textrange('set', -4);

        @_generateFormatting()

    _generateFormatting: -> # updateMarkdownPreview
        currentval = @textboxarea.val() #escapeHtml();
        lastval = @textboxarea.data "lastval"

        if lastval != currentval
            @textboxarea.data "lastval", currentval

            youtuberegex = /(\!\[:youtube\]\(([^\)]+)\))/gm
            youtubereplace = '<iframe width="600" height="400" style="max-width: 100%;" src="http://www.youtube.com/embed/$1?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>'

            #sanitize = html_sanitize(currentval);
            markdownpreview = marked(currentval.replace(youtuberegex,youtubereplace))
            @textboxpreview.html markdownpreview

            codeblocks = @textboxpreview.find("pre code")

            if codeblocks.length isnt 0
                codeblocks.each ->
                    hljs.highlightBlock(@)



