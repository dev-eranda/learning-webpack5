import './button.scss'
class Button {
    buttonCssClass = 'button'
    render() {
        const button = document.createElement('button')
        const body = document.querySelector('body')
        button.innerHTML = 'Click Me'
        button.onclick = function () {
            const p = document.createElement('p');
            p.innerHTML = "Nice Job";
            p.classList.add('text');
            body.appendChild(p);
        }
        button.classList.add(this.buttonCssClass);
        body.appendChild(button)
    }
}

export default Button