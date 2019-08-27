const win = document.documentElement;
const colorPickerEl = document.getElementById("chooseColor");
const paintBucket = document.getElementById("paintBucket");
const currentColor = document.getElementById("currentColor");
const prevColor = document.getElementById("prevColor");
const figures = document.getElementsByClassName("figure");
const moveEl = document.getElementById("move");
const canvas = document.getElementById("figures");
const transform = document.getElementById("transform");
var state = {
    currentTool: ''
};
//remember colors
if (localStorage.getItem('prevColor') !== null) {
    prevColor.style.backgroundColor = localStorage.getItem('prevColor')
}
if(localStorage.getItem('currentColor')!==null){
    currentColor.style.backgroundColor=localStorage.getItem('currentColor')
}
//paintBucket element
paintBucket.addEventListener('click', (e) => {
    state.currentTool = 'paintBucket';
    paintBucket.className = "active";
    win.style.cursor = "url('assets/images/paintBacket.cur'),auto";
    colorPickerEl.classList.remove("active");
    moveEl.classList.remove("active");
    transform.classList.remove("active");
    e.stopPropagation();
});

//choose color element
colorPickerEl.addEventListener('click', (e) => {
    state.currentTool = 'chooseColor';
    colorPickerEl.className = "active";
    paintBucket.classList.remove("active");
    moveEl.classList.remove("active");
    win.style.cursor = "url('assets/images/pipette.cur'),auto";
    transform.classList.remove("active");
    e.stopPropagation();
});

//move element
moveEl.addEventListener('click', (e) => {
    if (paintBucket.className === "active" || colorPickerEl.className === "active") {
        paintBucket.classList.remove("active");
        colorPickerEl.classList.remove("active");
        state.currentTool = '';
    }
    win.style.cursor = "url('assets/images/move.cur'),auto";
    transform.classList.remove("active");
    state.currentTool = 'move';
    moveEl.className = "active";
    e.stopPropagation();

});

//transform element
transform.addEventListener('click', (e) => {
    paintBucket.classList.remove("active");
    moveEl.classList.remove("active");
    colorPickerEl.classList.remove("active");
    win.style.cursor = "url('assets/images/transform.cur'),auto";
    transform.className = "active";
    state.currentTool = 'transform';
    e.stopPropagation();
});

win.addEventListener('click', (e) => {
    if (state.currentTool === 'paintBucket') {
        for (i = 0; i < figures.length; i++) {
            if (e.target === figures[i]) {
                e.target.style.backgroundColor = currentColor.style.backgroundColor;
                break;
            }
        }

    }
    if (state.currentTool === 'chooseColor') {
        if (e.target === prevColor) {
            let colorPrev = prevColor.style.backgroundColor;
            let colorCur = currentColor.style.backgroundColor;
            if (!colorPrev) {
                colorPrev = getComputedStyle(prevColor).backgroundColor;
                colorCur = getComputedStyle(currentColor).backgroundColor;
            }
            prevColor.style.backgroundColor = colorCur;
            currentColor.style.backgroundColor = colorPrev;
        } else {
            prevColor.style.backgroundColor = getComputedStyle(currentColor).backgroundColor;
            currentColor.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
        }
        localStorage.setItem('prevColor', prevColor.style.backgroundColor);
        localStorage.setItem('currentColor', currentColor.style.backgroundColor)
    }
    if (state.currentTool === 'transform') {
        for (i = 0; i < figures.length; i++) {
            if (e.target === figures[i]) {
                if (e.target.style.borderRadius === 150 + "px" || getComputedStyle(e.target).borderRadius === 150 + "px") {
                    e.target.style.borderRadius = 0
                } else {
                    e.target.style.borderRadius = 150 + "px";
                }
                break;
            }
        }
    }
});
document.addEventListener('mousedown', (e) => {
    if (state.currentTool === 'move') {
        for (i = 0; i < figures.length; i++) {
            if (e.target === figures[i]) {
                let elem = e.target;
                let getCoords = (elem) => {
                    var box = elem.getBoundingClientRect();
                    return {
                        top: box.top + pageYOffset,
                        left: box.left + pageXOffset
                    };
                };
                let moveAt = (e) => {
                    var newLeft = e.pageX - shiftX - coordsCanvas.left;
                    var newTop = e.pageY - shiftY - coordsCanvas.top;
                    var right = canvas.offsetWidth - elem.offsetWidth;
                    var bottom = canvas.offsetHeight - elem.offsetHeight;
                    if (newLeft < 0) {
                        newLeft = 0;
                    }
                    if (newLeft > right) {
                        newLeft = right;
                    }
                    if (newTop < 0) {
                        newTop = 0;
                    }
                    if (newTop > bottom) {
                        newTop = bottom;
                    }
                    elem.style.left = newLeft + "px";
                    elem.style.top = newTop + "px";

                };
                let coordsCanvas = getCoords(canvas);
                let coords = getCoords(elem);
                let shiftX = e.pageX - coords.left;
                let shiftY = e.pageY - coords.top;
                moveAt(e);
                elem.style.zIndex = 1000; // над другими элементами
                document.addEventListener('mousemove', moveAt);
                document.addEventListener('mouseup', () => {
                    document.removeEventListener("mousemove", moveAt);
                    this.onmouseup = null;
                });
                break;
            }
        }
    }
});
for (let i = 0; i < figures.length; i++) {
    figures[i].addEventListener('focus', (e) => {
        if (state.currentTool === 'move') {
            for (i = 0; i < figures.length; i++) {
                if (e.target === figures[i]) {

                    document.addEventListener('keydown', (e) => {
                        var elem = e.target;
                        let getCoords = (elem) => {
                            var box = elem.getBoundingClientRect();
                            return {
                                top: box.top + pageYOffset,
                                left: box.left + pageXOffset
                            };
                        };
                        let rightMove = () => {
                            var newRight = coords.left - coordsCanvas.left + 5;
                            var right = canvas.offsetWidth - elem.offsetWidth;
                            if (newRight > right) {
                                newRight = right;
                            }
                            elem.style.left = newRight + "px";
                        };
                        let leftMove = () => {
                            var newLeft = coords.left - coordsCanvas.left - 5;
                            if (newLeft < 0) {
                                newLeft = 0;
                            }
                            elem.style.left = newLeft + "px";
                        };
                        let topMove = () => {
                            var newTop = coords.top - coordsCanvas.top - 5;
                            if (newTop < 0) {
                                newTop = 0;
                            }
                            elem.style.top = newTop + "px";
                        };
                        let bottomMove = () => {
                            var newTop = coords.top - coordsCanvas.top + 5;
                            var height = canvas.offsetHeight - elem.offsetHeight;
                            if (newTop > height) {
                                newTop = height;
                            }
                            elem.style.top = newTop + "px";
                        };
                        let coordsCanvas = getCoords(canvas);
                        let coords = getCoords(elem);
                        switch (e.keyCode) {
                            case 39:
                                rightMove(e);
                                break;
                            case 37:
                                leftMove(e);
                                break;
                            case 38:
                                topMove(e);
                                break;
                            case 40:
                                bottomMove();
                                break;
                        }
                    });
                    break;
                }
            }
        }
    })
}





