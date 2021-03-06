(() => {
  const
    scenery = window.jsScenery.react || window.jsScenery.dio,
    isReact = !!window.jsScenery.react,
    platform = isReact ? window.React : window.dio,
    platformName = isReact ? 'React' : 'DIO',
    render = isReact ? window.ReactDOM.render : window.dio.render,
    { createElement: h, Component } = platform,
    { defineComponent, defineContext } = scenery,
    { Spec } = window.jsSpec

  class Logger {
    constructor(log) {
      this.log = log
    }

    log() {
    }
  }

  const
    defaultLogger = new Logger(console.log),
    customLogger = new Logger((...args) => console.log('[Demo1]', ...args)),

    LoggerCtx = defineContext({
      displayName: 'LoggerCtx',
      type: Logger,
      defaultValue: defaultLogger
    }),

    Counter = defineComponent({
      displayName: 'Counter',

      properties: {
        initialValue: {
          type: Number,
          validate: Spec.integer,
          defaultValue: 0 
        }
      },

      inject: {
        logger: LoggerCtx
      },

      main: class extends Component {
        constructor(props) {
          super(props) 
          this.state = { counter: props.initialValue }
          props.logger.log('Counter has been initialized')
        }

        increaseCounter(delta) {
          this.props.logger.log('Increases counter by ' + delta)
          this.setState(state => ({ counter: state.counter + delta }))
        }

        render() {
          return (
            h('div', null,
              h('button', { onClick: () => this.increaseCounter(-1) }, '-'),
              h('span', null, ' ', this.state.counter, ' '),
              h('button', { onClick: () => this.increaseCounter(1) }, '+'))
          )
        }
      }
    }),

    Demo = defineComponent({
      displayName: 'Demo1',

      render() {
        return (
          h(LoggerCtx.Provider, { value: customLogger },
            h('h3', null, 'jsScenery demo 1 (', platformName, ')'),
            h(Counter, { x: 4 })
          ))
      }
    })

  render(h(Demo), document.getElementById('demo1'))
})()
