import Button from './components/button/Button'
import Heading from './components/heading/Heading'
import _ from 'lodash'

const heading = new Heading()
heading.render(_.upperFirst('index'))

const button = new Button()
button.render()
