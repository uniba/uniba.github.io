//= require jquery.fancybox/source/jquery.fancybox

(function(exports) {

  exports.EffectView = EffectView = function(_parent, _width, _height) {
    this.width = _width;
    this.height = _height;
    this.division = 31;
    this.timer = undefined;
    this.animateCount = 0;
    this.index = 6;
    this.waveLines = [];
    this.$canvas = _parent.children[0];
    this.img = _parent.children[1];
  };

  EffectView.prototype.render = function () {
    var self = this;
    for (var i = 0; i < self.division; i++) {
      self.waveLines.push(self.height);
    };
    self.ctx = self.$canvas.getContext('2d');
    self.$canvas.style = 'positon: absolute;';
    self.$canvas.width = self.width;
    self.$canvas.height = self.height;
    self.$canvas.addEventListener('mouseover', function () {
      self.index = 1;
      self.animateCount = 0;
      self.animate(self);
      self.waveLines[self.index] = -self.height * 1.1;
    });
    self.$canvas.addEventListener('mouseout', function() {
      self.animateCount = 0;
      self.animate(self);
      self.waveLines[self.index] = self.height * 2.1;
    });
    return this;
  };

  EffectView.prototype.animate = function (_that) {
    self = _that;
    self.ctx.clearRect(0, 0, self.width, self.height);
    
    self.ctx.save();
    self.ctx.beginPath();
    for (var i = 0; i < self.division; i++) {
      if (self.index > i) {
        self.waveLines[i] = (self.waveLines[i + 1] * 0.68 +  self.waveLines[i] * 0.32);
      } else {
        self.waveLines[i] = (self.waveLines[i - 1] * 0.68  + self.waveLines[i] * 0.32);
      }
      self.ctx.lineTo(i * self.width / (self.division - 1), self.waveLines[i]);
    };
    self.ctx.lineTo(self.width, self.height);
    self.ctx.lineTo(0, self.height);
    self.ctx.closePath();
    self.ctx.fill();
    self.ctx.clip();
    self.ctx.drawImage(self.img, 0, 0, self.width, self.height);
    self.ctx.restore();
    clearTimeout(self.timer);
    if (self.division >  self.animateCount) {
      self.timer = setTimeout(self.animate, 20, self);
    }
    self.animateCount++;
  };

}).call(this, this.u || (this.u = {}));
