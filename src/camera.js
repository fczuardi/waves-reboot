var ease = require("eases/cubic-out");

var stageCenteringTime = 2000;

class Camera {
  constructor(stage, subject) {
    this.stage = stage;
    this.subject = subject;
    this.t = 0;
    this.isMoving = false;
    this.stageX0 = stage.x;
    this.stageY0 = stage.y;
  }

  startCameraFollow() {
    this.t = 0;
    this.isMoving = true;
    this.stageX0 = this.stage.x;
    this.stageY0 = this.stage.y;
  }

  cameraFollowStep(deltaTime) {
    if (this.t > stageCenteringTime) {
      this.isMoving = false;
      return null;
    }
    var p = ease(this.t / stageCenteringTime);
    var [deltaX, deltaY] = this.deltaCenter(this.subject, this.stage);

    this.stage.setTransform(
      this.stageX0 + deltaX * p,
      this.stageY0 + deltaY * p
    );
    this.t += deltaTime;
  }

  // given a body and a stage it will return
  // a pair of deltaX, deltaY
  // of how much the stage should move to end up
  // displaying this body in the center of the screen
  deltaCenter() {
    var [screenCenterX, screenCenterY] = screenCenter();
    var [bodyX, bodyY] = this.subject.interpolatedPosition;
    return [
      screenCenterX - bodyX - this.stageX0,
      screenCenterY - bodyY - this.stageY0
    ];
  }
}

// gets the coordinates for the center of the screen
function screenCenter() {
  return [window.screen.width / 2, window.screen.height / 2];
}

module.exports = Camera;
