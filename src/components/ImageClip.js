import React from 'react'
class ImageClip extends React.Component {
  constructor(props) {
    super(props)
    let winW = document.documentElement.clientWidt,
      ratio = window.ratio // html 字体大小
    let W = winW - 0.4 * ratio,
      H = W,
      MW = W * 0.7,
      MH = MW,
      ML = (W - MW) / 2,
      MT = (H - MH) / 2
    this.state = {
      W,
      H,
      MW,
      MH,
      ML,
      MT,
      S: false
    }
  }
  fileChange = () => {
    this.setState({
      S: true
    })
    let picOM = this._file.files[0]
    if (!picOM) return
    let fileReader = new FileReader()
    fileReader.readAsDataURL(picOM)
    fileReader.onload = e => {
      this.img = new Image()
      this.img.src = e.target.result
      this.img.onload = () => {
        let n = 1, // 缩放比例
          { W, H } = this.state
        this.IW = this.img.width
        this.IH = this.img.height
        if (this.IW > this.IH) {
          n = this.IW / W
          this.IW = W
          this.IH = this.IH / n
        } else {
          n = this.IH / H
          this.IH = H
          this.IW = this.IW / n
        }
        this.IL = (W - this.IW) / 2
        this.IT = (H - this.IH) / 2
        this.drawImage()
      }
    }
  }
  drawImage = () => {
    let { W, H } = this.state
    this.ctx = this._canvas.getContext('2d')
    this.ctx.clearRect(0, 0, W, H) // 移出
    this.ctx.drawImage(this.img, this.IL, this.IT, this.IW, this.IH)
  }
  render() {
    let { W, H, MW, MH, MT, ML, S } = this.state
    return (
      <div
        className="clipImageBox"
        onTouchStart={ev => {
          let point = ev.changedTouches[0]
          this.startX = point.clientX
          this.startY = point.clientY
        }}
        onTouchMove={ev => {
          let point = ev.changedTouches[0]
          let changeX = point.clientX - this.startX,
            changeY = point.clientY - this.startY
          if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            this.IL += changeX
            this.IT += changeY
            this.drawImage()
            this.startX = point.clientX
            this.startY = point.clientY
          }
        }}
      >
        <div className="canvasBoxDiv">
          <canvas
            className="canvasBox"
            width={W}
            height={H}
            ref={x => (this._canvas = x)}
          ></canvas>
          <div
            className="mark"
            style={{
              width: MW + 'px',
              height: MH + 'px',
              left: ML + 'px',
              top: MT + 'px',
              display: S ? 'block' : 'none'
            }}
          ></div>
        </div>
        <div className="buttonBox">
          <input
            type="file"
            accept="image/*"
            className="file"
            ref={x => (this._file = x)}
            onChange={this.fileChange}
          />
          <button
            className="choose"
            onClick={ev => {
              console.log(11)
              this._file.click()
            }}
          >
            选择图片
          </button>
          <button
            onClick={ev => {
              if (!this.img) return
              this.IW += 10
              this.IH += 10
              this.drawImage()
            }}
          >
            放大
          </button>
          <button
            onClick={ev => {
              if (!this.img) return
              this.IW -= 10
              this.IH -= 10
              this.drawImage()
            }}
          >
            缩小
          </button>
          <button
            className="submit"
            onClick={ev => {
              if (!this.img) return
              let imagedata = this.ctx.getImageData(ML, MT, MW, MH),
                canvas2 = document.createElement('canvas'),
                ctx2 = canvas2.getContext('2d')
              canvas2.width = MW
              canvas2.height = MH
              ctx2.putImageData(imagedata, 0, 0, 0, 0, MW, MH)
              this.props.change(canvas2.toDataURL('image/png'))
            }}
          >
            保存图片
          </button>
        </div>
      </div>
    )
  }
}

export default ImageClip
