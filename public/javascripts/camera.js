this.Camera = (function() {
  "use strict";
  navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

  window.URL = window.URL || window.msURL || window.mozURL || window.webkitURL;

  function Camera(opt) {
    if (opt == null) {
      opt = {};
    }
    this.width = opt.width || null;
    this.height = opt.height || null;
    this.interval = opt.interval || 33;
    this.mirror = opt.mirror != null ? opt.mirror : false;
    this.useAudio = opt.useAudio != null ? opt.useAudio : true;
    this.useVideo = opt.useVideo != null ? opt.useVideo : true;
    this.video = opt.video || document.createElement("video");
    this.canvas = opt.canvas || document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
  }

  Camera.prototype.setup = function(fn) {
    var _this = this;
    this.video.addEventListener("loadeddata", (function() {
      if (_this.width == null) {
        _this.width = _this.video.videoWidth;
      }
      if (_this.height == null) {
        _this.height = _this.video.videoHeight;
      }
      _this.canvas.width = _this.video.width = _this.width;
      _this.canvas.height = _this.video.height = _this.height;
      fn.call(_this);
      return _this.video.play();
    }), false);
    return this;
  };

  Camera.prototype.draw = function(fn) {
    var error, recur, success,
      _this = this;
    this.video.addEventListener("play", (function() {
      return setTimeout(recur, _this.interval);
    }), false);
    recur = function() {
      if (_this.mirror) {
        _this.context.translate(_this.width, 0);
        _this.context.scale(-1, 1);
        _this.context.drawImage(_this.video, 0, 0, _this.width, _this.height);
        _this.context.translate(_this.width, 0);
        _this.context.scale(-1, 1);
      } else {
        _this.context.drawImage(_this.video, 0, 0, _this.width, _this.height);
      }
      fn.call(_this);
      return setTimeout(recur, _this.interval);
    };
    success = function(stream) {
      if (_this.video.mozSrcObject != null) {
        return _this.video.mozSrcObject = stream;
      } else {
        return _this.video.src = window.URL.createObjectURL(stream) || stream;
      }
    };
    error = function() {
      return alert("There has been a problem retrieving the streams - did you allow access?");
    };
    if (navigator.getUserMedia != null) {
      return navigator.getUserMedia({
        video: this.useVideo,
        audio: this.useAudio
      }, success, error);
    } else {
      return alert("Native web camera streaming (getUserMedia) not supported in this browser.");
    }
  };

  return Camera;

})();