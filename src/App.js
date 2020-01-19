import React from 'react'
import ImageClip from './components/ImageClip'
// import './static/reset.min.css'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 1,
      pic: ''
    }
  }
  change = imagedata => {
    this.setState({
      pic: imagedata,
      stage: 0
    })
  }
  render() {
    let { stage, pic } = this.state
    return (
      <main className="mainBox">
        <div
          className="baseInfo"
          style={{
            display: stage === 0 ? 'block' : 'none'
          }}
        >
          <div
            className="imgBox"
            onClick={ev => {
              this.setState({
                stage: 1
              })
            }}
          >
            <img src={pic} alt="" />
          </div>
          <div className="desc">
            <p>姓名：xxx</p>
            <p>性别：xxx</p>
            <p>微信：xxx</p>
            <p>xxx</p>
          </div>
        </div>
        <div
          className="handleBox"
          style={{
            display: stage === 0 ? 'none' : 'block'
          }}
        >
          <div className="returnBtn">
            <span
              onClick={ev => {
                this.setState({
                  stage: 0
                })
              }}
            >
              返回
            </span>
          </div>
          <ImageClip change={this.changes}></ImageClip>
        </div>
      </main>
    )
  }
}

export default App
