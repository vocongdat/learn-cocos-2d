import {
  _decorator,
  Component,
  Node,
  Vec2,
  systemEvent,
  SystemEvent,
  EventMouse,
} from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ControllPlayer
 * DateTime = Fri Oct 01 2021 07:56:48 GMT+0700 (Indochina Time)
 * Author = congdat
 * FileBasename = ControllPlayer.ts
 * FileBasenameNoExtension = ControllPlayer
 * URL = db://assets/script/ControllPlayer.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('ControllPlayer')
export class ControllPlayer extends Component {
  private _startMove: boolean = false;
  private _moveStep: number = 0;
  private _curMoveTime: number = 0;
  private _moveTime: number = 0.3;
  private _curMoveSpeed: number = 0;
  private _curPos: Vec2 = new Vec2();
  private _deltaPos: Vec2 = new Vec2(0, 0);
  private _targetPos: Vec2 = new Vec2();
  private _curMoveIndex = 0;

  start() {
    // [3]
  }

  reset() {
    this._curMoveIndex = 0;
  }

  setInputActive(active: boolean) {
    if (active) {
      systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
    } else {
      systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
    }
  }

  onMouseUp(e: EventMouse) {
    if (e.getButton() === 0) {
      this.jumpByStep(1);
    } else if (e.getButton() === 2) {
      this.jumpByStep(2);
    }
  }

  jumpByStep(step: number) {
    if (this._startMove) {
      return;
    }
    this._startMove = true;
    this._moveStep = step;
    this._curMoveTime = 0;
    this._curMoveSpeed = this._moveStep / this._moveTime;
    Vec2.add(this._targetPos, this._curPos, new Vec2(this._moveStep, 0));

    // if (this.BodyAnim) {
    //     if (step === 1) {
    //         //this.BodyAnim.play('oneStep');
    //     } else if (step === 2) {
    //         this.BodyAnim.play('twoStep');
    //     }
    // }

    this._curMoveIndex += step;
  }

  update(deltaTime: number) {
    if (this._startMove) {
      this._curMoveTime += deltaTime;
      if (this._curMoveTime > this._moveTime) {
        // end
        this._startMove = false;
      } else {
        // tween
        this._deltaPos.x = this._curMoveSpeed * deltaTime;
        Vec2.add(this._curPos, this._curPos, this._deltaPos);
      }
    }
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
