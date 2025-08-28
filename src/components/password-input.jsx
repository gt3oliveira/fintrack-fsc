import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = forwardRef(
  ({ placeholder = 'Digite sua senha', ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
      <div className="relative">
        <Input
          type={passwordVisible ? 'text' : 'password'}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        <Button
          variant="ghost"
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="absolute bottom-0 right-0 top-0 my-auto mr-1 size-8 cursor-pointer text-muted-foreground"
        >
          {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
