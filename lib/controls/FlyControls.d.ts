import {
	Camera
} from '../three.module.js';

export class FlyControls {

	constructor( object: Camera, domElement?: HTMLElement );

	object: Camera;
	domElement: HTMLElement | HTMLDocument;

	movementSpeed: number;
	rollSpeed: number;
	dragToLook: boolean;
	autoForward: boolean;

	update( delta: number ): void;
	dispose(): void;

}
