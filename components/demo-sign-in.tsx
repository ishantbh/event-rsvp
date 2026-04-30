import { Button } from '@/components/ui/button'

export function DemoSignIn() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      id='demo-sign-in-form'
      className='w-full mt-4'
    >
      <Button type='submit' form='demo-sign-in-form' className='w-full'>
        Sign In with Demo User
      </Button>
    </form>
  )
}
