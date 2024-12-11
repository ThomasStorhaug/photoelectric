import { Loader } from 'excalibur';

export class CustomLoader extends Loader {

    suppressPlayButton = true;

    constructor(resources) {
        super(resources);
        // Optional: Customize logo, background color, etc.
        // this.logo = new ImageSource('/path/to/logo.png');
        // this.backgroundColor = 'white';
        this.backgroundColor = '#1c1917'
        this.logo = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAAaRJREFUaIHtm9kNwkAMRJ2IBuiNaiiAauiNEuALKQp7+BqvF+18oZDYfhybeJxsj9fzTQfdr7eNJtaZZ+/tMJNKtf8A1nbMrlrNRcDWARnVqrUK2Dswi3o1NgE5AUaKU1sXkBsoWtyaWICSgBGS1MIGlAZGSVqDCFCTwFOa3GJAbSKrtDlVgJaE0bk2awD0tau1tv37AlVA633LsT19mfbzBo00hUbAEZ3+g1GQUXBEhkWmJE7hSLiSXAGJbAUiVmZ3QCJdoajTDgQwkxbg7IIDtk49EQ7eD6BX0uOiUYp53Ia8rq3CeCUtgaDgSh9k89tCQCLit3J0f44oyAg4osBVVHItKlFvzbh4JeJohBOwzoOzawHOrgU4uxbg7Pp7QFZrlGGqVBKntWP3ftkguX2rqLnNAilpysXd+2hIqeOgsidGQWrsFNgswltar8hkMEVBWowws4OGhrS6fO4Woac8LEw349Ub0sufdXWW0TajRu7WuRXS286HzAa0kIhZBWz4IYVEDWJS3OOCnDLBx1c9SPQILeQO+xpkxHww7BGCUY8vfABt9hDrIxAuVQAAAABJRU5ErkJggg=='
        this.canvasWidth = 800;
        this.canvasHeight = 600;
    }

    onDraw(ctx) {
        // Clear the screen
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        // Calculate progress
        const progress = this.progress; // Value between 0 and 1

        // Choose custom position and size for the progress bar
        const barWidth = this.canvasWidth * 0.5;
        const barHeight = 20;
        const barX = (this.canvasWidth - barWidth) / 2; // Centered horizontally
        const barY = (this.canvasHeight / 2) + 100; // Move down 100px from center

        // Draw the progress bar background
        ctx.fillStyle = '#166534';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Draw the progress bar fill
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(barX, barY, barWidth * progress, barHeight);

        // Optional: Draw text
        ctx.fillStyle = '#16a34a';
        ctx.font = '20px Arial';
        ctx.fillText(`Loading... ${Math.floor(progress * 100)}%`, barX, barY - 10);
    }

}
