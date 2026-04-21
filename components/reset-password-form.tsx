export function ResetPasswordForm({ token }: { token: string }) {
  return (
    <div>
      <h1>Reset Password</h1>
      <p>Token: {token}</p>
    </div>
  )
}
