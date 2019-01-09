
// 中奖名单动画 
function awardBeforeEnter(el){
  Velocity(el,
    { 
      translateY:[0, 500],
      translateX:[0, 500],
      opacity: 0.5,
      scale: 0.5,
    }, {
      duration: 1000
    }
  )
}
export { awardBeforeEnter }

function awardEnter(el, done) {
  Velocity(el,
    { opacity: 0.8 ,
      scale: 2,
      translateY:[200,0]
    },
    {
      duration: 1000,
      complete : () => {
        Velocity(el,{
          opacity: 1,
          scale: 1,
          translateY:[0,200],
          rotateX: [-360, 360]},
          {
            duration: 500
          }
        )
      },
    }
  )
}
export { awardEnter }

function awardLeave(el, done) {
  Velocity(el,
    { 
      rotateZ: [-360, 360],
      opacity: 0,
      scale: 0
    },
    {
      duration: 500,
    }
  )
}
export { awardLeave }


// 中奖列表动画 
function contentBeforeEnter (el){
  Velocity(el,
    { 
      opacity: 0.2,
      scale: 0.2,
      // translateY:[0, -500],
      translateX:[0, -500]
    }, {
      duration: 1000
    }
  )
}
export { contentBeforeEnter }

function contentEnter(el, done) {
  Velocity(el,
    { 
      // rotateY: [-360, 360],
      opacity: 0.8,
      scale: 2,
      
    },
    {
      duration: 500,
      complete : () => {
        Velocity(el,{
          opacity: 1,
          scale: 1,
        },
          {
            duration: 500
          }
        )
      },
    }
  )
}
export { contentEnter }

function contentLeave(el, done) {
  Velocity(el,
    { 
      opacity: 0,
      scale: 0
    },
    {
      duration: 500,
    }
  )
}
export { contentLeave }