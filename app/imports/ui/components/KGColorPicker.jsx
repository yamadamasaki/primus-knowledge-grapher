import React, {useState} from 'react'
import {SketchPicker} from 'react-color'

const KGColorPicker = ({color, setColor}) => {
  const [showPicker, setShowPicker] = useState(false)

  const colorStyle = {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
  }
  const swatchStyle = {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  }
  const popoverStyle = {
    position: 'absolute',
    zIndex: '2',
  }
  const coverStyle = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  return (
      <div>
        <div style={swatchStyle} onClick={() => setShowPicker(!showPicker)}>
          <div style={colorStyle}/>
        </div>
        {
          showPicker ? (
              <div style={popoverStyle}>
                <div style={coverStyle} onClick={() => setShowPicker(false)}/>
                <SketchPicker color={color} onChange={color => setColor(color.hex)}/>
              </div>
          ) : null
        }
      </div>
  )
}

export default KGColorPicker
