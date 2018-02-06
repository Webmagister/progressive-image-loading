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

window.onload = function ()
{
    var listImg = document.querySelectorAll('img[data-src]');
    if (listImg.length !== 0)
    {
        for (var i = 0, len = listImg.length; i < len; i++)
        {
            SetHandler(listImg[i]);
        }
    }
};

window.onscroll = function ()
{
    var listImg = document.querySelectorAll('img[data-src]');
    if (listImg.length !== 0)
    {
        for (var i = 0, len = listImg.length; i < len; i++)
        {
            SetHandler(listImg[i]);
        }
    }
};

function SetHandler(img)
{
    var offsetTop = img.getBoundingClientRect().top + document.body.scrollTop;
    var scrolled = document.body.scrollTop;

    if (scrolled === 0)
    {
        scrolled = document.documentElement.clientHeight;
    }
    if (scrolled > offsetTop)
    {
        img.setAttribute('src', img.getAttribute('data-src'));

        img.onload = function ()
        {
            img.removeAttribute('data-src');
            img.parentNode.classList.add('is-imageLoaded');
        };
    }
}