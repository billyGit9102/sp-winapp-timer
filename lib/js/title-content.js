"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.titleContentInit = void 0;

var _globalVar_html = require("./globalVar_html.js");

var titleContentInit = function titleContentInit() {
  var ele_doingNote = document.getElementById("doingNote");
  update_curDoing(ele_doingNote.value);

  function change_curDoing_handler(e) {
    console.log(document.getElementById("curDoing").value);
    update_DoingNote(document.getElementById("curDoing").value);
  }

  document.getElementById("curDoing").addEventListener("change", change_curDoing_handler);

  function update_DoingNote(str) {
    ele_doingNote.value = ele_doingNote.value.replace(/.*/, str);
    $("#doingNote").trigger("change");
  }

  function update_curDoing(str) {
    document.getElementById("curDoing").value = str.match(/.*/)[0];
  }

  $("#doingNote").on("change", function () {
    var title = $(this).val();
    update_curDoing(title);
    console.log(title);
    $.ajax({
      url: _globalVar_html.base_url + 'doing_timer/set_title/' + _globalVar_html.type,
      data: {
        'title': title
      },
      type: "POST",
      success: function success(response) {
        console.log("set-title=" + response);
      }
    });
  });
  $("#timeMark").on("change", function () {
    var content = $(this).val();
    console.log("content-change=" + content);
    $.ajax({
      url: "http://bf2c.info/sp/project/ci-doing-timer-v5/doing_timer/set_content/" + window.timerType,
      data: {
        'content': content
      },
      type: "POST",
      success: function success(response) {
        console.log(response);
      }
    });
  });
};

exports.titleContentInit = titleContentInit;