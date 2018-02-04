[].forEach.call(document.querySelectorAll('div.js-progressiveMedia'), function (elem)
{
    var maxWidth = elem.getAttribute('data-width');
    var maxHeight = elem.getAttribute('data-height');
    var aspectRatio = ((maxHeight / maxWidth) * 100).toFixed(1);
    elem.previousSibling.previousSibling.setAttribute('style', 'padding-bottom:' + aspectRatio + '%;');
    elem.parentNode.setAttribute('style', 'max-width:' + maxWidth + 'px; max-height:' + maxHeight + 'px;');

    var canvas = elem.getElementsByTagName('canvas')[0];
    var pic = new Image();
    pic.src = elem.getElementsByTagName('img')[0].getAttribute('src');
    var ctx = canvas.getContext('2d');

    var canvasWidth;
    var canvasHeight;
    if (maxWidth > maxHeight)
    {
        canvasWidth = 75;
        canvasHeight = maxHeight / (maxWidth / 75);
    }
    else
    {
        canvasHeight = 75;
        canvasWidth = maxWidth / (maxHeight / 75);
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    pic.onload = function ()
    {
        ctx.filter = 'blur(5px)';
        canvas.parentNode.classList.add('is-canvasLoaded');
        ctx.drawImage(this, -10, -10, canvasWidth + 20, canvasHeight + 20);
    }
});
[].forEach.call(document.querySelectorAll('img[data-src]'), function (img)
{
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function ()
    {
        img.removeAttribute('data-src');
        img.parentNode.classList.add('is-imageLoaded');
    };
});