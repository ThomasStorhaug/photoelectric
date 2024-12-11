export function wavelengthToRGB(wavelength) {
    let R = 0, G = 0, B = 0;

    if (wavelength >= 380 && wavelength < 440) {
        R = -(wavelength - 440) / (440 - 380);
        G = 0;
        B = 1;
    } else if (wavelength >= 440 && wavelength < 490) {
        R = 0;
        G = (wavelength - 440) / (490 - 440);
        B = 1;
    } else if (wavelength >= 490 && wavelength < 510) {
        R = 0;
        G = 1;
        B = -(wavelength - 510) / (510 - 490);
    } else if (wavelength >= 510 && wavelength < 580) {
        R = (wavelength - 510) / (580 - 510);
        G = 1;
        B = 0;
    } else if (wavelength >= 580 && wavelength < 645) {
        R = 1;
        G = -(wavelength - 645) / (645 - 580);
        B = 0;
    } else if (wavelength >= 645 && wavelength <= 780) {
        R = 1;
        G = 0;
        B = 0;
    } else {
        // wavelength not in the visible range
        R = 0;
        G = 0;
        B = 0;
    }

    // Dimming factors at the edges of the spectrum for realism
    let factor = 1.0;
    if (wavelength > 700) {
        factor = 0.3 + 0.7 * (780 - wavelength) / (80);  // Fade towards infrared
    } else if (wavelength < 420) {
        factor = 0.3 + 0.7 * (wavelength - 380) / (40);   // Fade towards UV
    }

    R = Math.round(R * 255 * factor);
    G = Math.round(G * 255 * factor);
    B = Math.round(B * 255 * factor);

    return [R, G, B];
}
