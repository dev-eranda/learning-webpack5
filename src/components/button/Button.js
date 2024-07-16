import './button.scss'
class Button {
    render() {
        const button = document.createElement('button')
        button.innerHTML = 'Click Me'
        button.classList.add('button');
        button.onclick = function () {
            const p = document.createElement('p');
            p.innerHTML = "Nice Job";
            p.classList.add('text');
            body.appendChild(p);
        }
        button.classList.add(this.buttonCssClass);

        const body = document.querySelector('body')
        body.appendChild(button)
    }
}

export default Button