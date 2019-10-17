import React, { useState, useEffect } from 'react'
import { UserObject, UsersPool, InitialsObject } from '../../store/reducers/usersReducer'

interface Props {
  users: UsersPool
  total: number
  initials: Array<InitialsObject>
}

const Debts: React.FunctionComponent<Props> = props => {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [userDebts, setUserDebts] = useState<UserObject[] | null>(null)

  // const clickHandler = (e: MouseEvent) => {
  //   let target = e.target as HTMLElement
  //   if (!target.className.includes('bubble')) {
  //     console.log('close debts!')
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', (e: MouseEvent) => clickHandler(e))

  //   return () => {
  //     document.removeEventListener('click', (e: MouseEvent) => clickHandler(e))
  //   }
  // }, [])

  const showUserDebt = (uid: string) => {
    console.log('hi', props.users[uid])
  }

  return !!props.initials.length ? (
    <div className='debts-and-bubbles'>
      <div className='user-bubbles'>
        {props.initials.map((userInitials, idx) => {
          return (
            <div
              className='bubble'
              key={idx + 'init'}
              onClick={() => showUserDebt(userInitials.uid)}>
              {userInitials.init}
            </div>
          )
        })}
      </div>

      <div className='debts'>
        <div className='debt'>
          i am a debt
        </div>
        <div className='debt'>
          i am a debt
        </div>
        <div className='closebutton'><img className='iconbutton' src='/icons/remove.svg' alt='close section' /></div>

      </div>
    </div>
  ) : null
}

export default Debts
