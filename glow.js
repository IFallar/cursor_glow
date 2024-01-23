const updateCursor = ({ x, y }) => {
    document.documentElement.style.setProperty('--x', x)
    document.documentElement.style.setProperty('--y', y)
  }
  
  document.body.addEventListener('pointermove', updateCursor)

let box = document.querySelector("#glow_div");
let boxBoundingRect = box.getBoundingClientRect();
let boxCenter= {
	x: boxBoundingRect.left + boxBoundingRect.width/2, 
  y: boxBoundingRect.top + boxBoundingRect.height/2
};

document.addEventListener("mousemove", e => {
	let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);	    
	box.style.transform = `rotate(${angle}deg)`;  
})

function handleMouseMove(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const innerCard = document.getElementById('inner_card');
  const glowDiv = document.getElementById('glow_div');

  if (
    mouseX >= innerCard.offsetLeft &&
    mouseX <= innerCard.offsetLeft + innerCard.offsetWidth &&
    mouseY >= innerCard.offsetTop &&
    mouseY <= innerCard.offsetTop + innerCard.offsetHeight
  ) {
    glowDiv.style.display = 'flex';
  } else {
    const distance = calculateDistanceFromBounds(mouseX, mouseY, innerCard);

    const triggerDistance = 50;
      if (distance <= triggerDistance) {
      glowDiv.style.display = 'flex';
    } else{
      glowDiv.style.display = 'none';
    }
  }
}

function calculateDistanceFromBounds(x, y, element) {
  const rect = element.getBoundingClientRect();
  const closestX = Math.max(rect.left, Math.min(x, rect.right));
  const closestY = Math.max(rect.top, Math.min(y, rect.bottom));

  return Math.sqrt(Math.pow(closestX - x, 2) + Math.pow(closestY - y, 2));
}

document.addEventListener('mousemove', handleMouseMove);