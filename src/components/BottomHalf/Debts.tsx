import React, { useState, useEffect, useRef, useCallback } from 'react'
import usersReducer, {
  UserObject,
  UsersPool,
  InitialsObject,
  DebtPool,
  DebtObject,
} from '../../store/reducers/usersReducer'
import { getInitials } from '../functions'

interface Props {
  users: UsersPool
  debts: DebtPool
  total: number
  initials: Array<InitialsObject>
}

const Debts: React.FunctionComponent<Props> = props => {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [userDebts, setUserDebts] = useState<DebtObject[]>([])
  const [isDebtOneUser, setIsDebtOneUser] = useState<boolean>(false)
  const [debtsHeight, setDebtsHeight] = useState<number>(25)

  // onMount
  useEffect(() => {
    if (!userDebts.length || !isDebtOneUser) {
      setAllDebts(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.debts])

  const calcDebtsHeight = (length: number) => {
    let height = length * 20 + 20
    console.log('height', userDebts, height)
    if (height !== debtsHeight) {
      setDebtsHeight(height)
    }
  }

  const setAllDebts = (setDebts: boolean): void | DebtObject[] => {
    let alldebts: DebtObject[] = []

    Object.keys(props.debts).map(uid => {
      alldebts = alldebts.concat(props.debts[uid])
    })

    if (!!setDebts) {
      if (isDebtOneUser) {
        setIsDebtOneUser(false)
      }
      setUserDebts(alldebts)
      calcDebtsHeight(alldebts.length)
    } else return alldebts
  }

  const filterUserDebt = (uid: string) => {
    if (collapsed) {
      setCollapsed(false)
    }

    if (!isDebtOneUser) {
      setIsDebtOneUser(true)
      let debts = userDebts.filter(debt => debt.ownerUID === uid)
      setUserDebts(debts)
      calcDebtsHeight(debts.length)
    } else {
      let debts = (setAllDebts(false) as DebtObject[]).filter(debt => debt.ownerUID === uid)
      setUserDebts(debts)
      console.log(debts.length, '!!!!!!!!!!!!!!!!!!!')
      calcDebtsHeight(debts.length)
    }
  }

  const closePanel = (isCollapsed: boolean) => {
    if (!isCollapsed && collapsed) {
      setCollapsed(false)
    } else if (isCollapsed && !collapsed) {
      setCollapsed(true)
    }
  }

  const debtsRef = useRef<HTMLDivElement>(null)

  return !!props.initials.length ? (
    <div className='debts-and-bubbles'>
      <div className='user-bubbles'>
        {props.initials.map((userInitials, idx) => {
          return (
            <div
              className='bubble'
              key={idx + 'init'}
              onClick={() => filterUserDebt(userInitials.uid)}>
              {userInitials.init}
            </div>
          )
        })}

        <div
          className='small-text hover'
          onClick={() => {
            setAllDebts(true)
            closePanel(false)
          }}>
          show all debts
        </div>
      </div>

      <div
        className={`debts ${collapsed ? 'collapsed' : ''}`}
        style={collapsed ? {} : { height: `${debtsHeight}px` }}
        ref={debtsRef}>
        {!!userDebts.length ? (
          userDebts.map(debt => {
            let debtor = props.users[debt.ownerUID].name
            let debtee = props.users[debt.payToUID].name
            debtor = debtor.split(' ')[0] + ' ' + getInitials(debtor).slice(1)
            debtee = debtee.split(' ')[0] + ' ' + getInitials(debtee).slice(1)
            if (debtor.split(' ')[0].length > 10) {
              debtor = debtor.split(' ')[0].slice(0, 10) + '(...)' + debtor.split(' ')[1]
            }
            if (debtee.split(' ')[0].length > 10) {
              debtee = debtee.split(' ')[0].slice(0, 10) + '(...)' + debtee.split(' ')[1]
            }

            return (
              <div className='debt' key={debt.ownerUID + debt.payToUID + debt.amount}>
                {debtor} : pay {debtee} ${debt.amount.toFixed(2)}
              </div>
            )
          })
        ) : isDebtOneUser ? (
          <div className='small-text'>No need to pay anyone...</div>
        ) : (
          <div className='small-text'>Add some paid amounts to start building debts...</div>
        )}

        <div className='closebutton'>
          <img
            className='iconbutton'
            src='/icons/remove.svg'
            alt='close section'
            onClick={() => closePanel(true)}
          />
        </div>
      </div>
    </div>
  ) : null
}

export default Debts
