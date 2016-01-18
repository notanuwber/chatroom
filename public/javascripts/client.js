$(function () {
    var currentUser = $.cookie("user");
    var socket = io.connect();
    socket.emit("enter", {user: currentUser});

    socket.on("enter", function (object) {
        var info = '<div class="well" style="color:#cc8611;">' + object.user + ' entered <span1>' + new Date().toTimeString() + '</span1></div>';
        $("#history").append(info);
        $('.well').last()[0].scrollIntoView(false);
    });

    socket.on("say", function (data) {
        print(data);
    });

    socket.on("exit", function (object) {
        var info = '<div class="well" style="color:#cc8611;">' + object.user + ' exit <span1>' + new Date().toTimeString() + '</span1></div>';
        $("#history").append(info);
        $('.well').last()[0].scrollIntoView(false);
    });

    //send message
    $("button").click(function () {
        var message = $("#message").val();
        if (message == "") {
            return;
        }

        var info = '<div class="well"><h4 style="display:inline;">'
            + currentUser + '</h4> <span>' + new Date().toTimeString() + '</span><br/><div id="text">' + message + '</div></div>';
        $("#history").append(info);
        socket.emit("say", {time: Date.now(), name: currentUser, content: message});
        $('.well').last()[0].scrollIntoView(false);
        $("#message").val('').focus();
    });

    // get history
    $.get('/history', function (object) {
        object.forEach(function (item, index, array) {
            print(item);
        });
    });

    function print(object) {
        var info = '<div class="well well-lg">'
            + '<h3 style="display:inline;">' + object.name + '</h3>'
            + '<p class="span1">' + new Date(object.time).toTimeString() + '</p>'
            + '<br/><p id="content">' + object.content + '</p></div>';
        $("#history").append(info);
        $('.well').last()[0].scrollIntoView(false);
    }
});
