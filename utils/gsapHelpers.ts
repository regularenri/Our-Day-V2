import gsap from "gsap";

/*
This helper function setup a horizontal loop with GSAP.
Source: https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop/
*/
export function horizontalLoop(items: any[], config: any) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
        length = items.length,
        startX = items[0].offsetLeft,
        times: any[] = [],
        widths: any[] = [],
        xPercents: any[] = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1), // logic to snap to the closest index but de-activated by default
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: 0
    });
    widths = items.map(el => el.offsetWidth);
    totalWidth = items[length - 1].offsetLeft + widths[length - 1] / 100 * (gsap.getProperty(items[length - 1], "xPercent") as number) + (gsap.getProperty(items[length - 1], "x") as number) - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = (gsap.getProperty(item, "x") as number) / widths[i] * 100;
        distanceToStart = item.offsetLeft + curX / 100 * widths[i] - startX;
        distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
        tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: curX, duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index: number, vars: any) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time < tl.time() && index > curIndex) { // if we're wrapping and going forward
            tl.vars.onComplete && tl.vars.onComplete();
            time += tl.duration();
        }
        curIndex = newIndex;
        return tl.tweenTo(time, vars);
    }
    tl.next = (vars: any) => toIndex(curIndex + 1, vars);
    tl.prev = (vars: any) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }
    return tl;
}
