import { createPortal } from 'react-dom'
import { forwardRef, useRef, useImperativeHandle } from 'react'
import Button from './Button';

const Modal = forwardRef(function Modal({ children ,buttonCaption}, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            },
        };
    })
    return createPortal(
    <dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-md'>
        {children}
        <form className='mt-4 text-right' method='dialog'>
            <Button>{buttonCaption}</Button>
        </form>
    </dialog>, document.getElementById('modal-root'))
})
export default Modal