import React, { useState, useEffect, useRef } from 'react'
import { UsersPool, InitialsObject, DebtPool, DebtObject } from '../../store/reducers/usersReducer'
import { nameFormat } from '../functions'

interface Props {
  users: UsersPool
  debts: DebtPool
  total: number
  initials: Array<InitialsObject>
}

interface LocalDebtObj extends DebtObject {
  color: string
  debtee: string
  debtor: string
}

const Debts: React.FunctionComponent<Props> = props => {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [userDebts, setUserDebts] = useState<LocalDebtObj[]>([])
  const [isDebtOneUser, setIsDebtOneUser] = useState<boolean>(false)
  const [debtsHeight, setDebtsHeight] = useState<number>(25)

  // onMount
  useEffect(() => {
    if (!userDebts.length || !isDebtOneUser) {
      setAllDebts(true)
    } else if (isDebtOneUser) {
      if (
        userDebts.length &&
        (!props.users[userDebts[0].ownerUID] || !props.users[userDebts[0].payToUID])
      ) {
        setAllDebts(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.debts, props.users])

  const calcDebtsHeight = (length: number) => {
    let height = length * 20 + 20
    if (!length) {
      height = 35
    }
    if (height !== debtsHeight) {
      setDebtsHeight(height)
    }
  }

  const setAllDebts = (setDebts: boolean): void | LocalDebtObj[] => {
    let alldebts: LocalDebtObj[] = []

    Object.keys(props.debts).forEach(uid => {
      let debtor = nameFormat(props.users[uid].name)
      let color = props.users[uid].color
      let debts = props.debts[uid].map(debtObj => {
        let debtee = nameFormat(props.users[debtObj.payToUID].name)
        return {
          ...debtObj,
          debtor,
          debtee,
          color,
        }
      })

      alldebts = alldebts.concat(debts)
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
      let debts = (setAllDebts(false) as LocalDebtObj[]).filter(debt => debt.ownerUID === uid)
      setUserDebts(debts)
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
              style={{
                border: `1px solid ${props.users[userInitials.uid].color}`,
                backgroundColor: '#f4f4f4',
              }}
              key={idx + 'init'}
              onClick={() => filterUserDebt(userInitials.uid)}>
              {userInitials.init ? userInitials.init : 'na'}
            </div>
          )
        })}

        <div
          className='grey-button-container'
          style={{ width: `${props.initials.length > 6 ? '100%' : '108px'}`, margin: '2px' }}>
          <div
            className='grey-button tiny'
            style={{ width: '100%', marginTop: `${props.initials.length > 6 ? '7px' : '0'}` }}
            onClick={() => {
              setAllDebts(true)
              closePanel(false)
            }}>
            show all debts
          </div>
        </div>
      </div>

      <div
        className={`debts ${collapsed ? 'collapsed' : ''}`}
        style={collapsed ? {} : { height: `${debtsHeight}px` }}
        ref={debtsRef}>
        {!!userDebts.length ? (
          userDebts.map(debt => {
            return (
              <div className='debt' key={debt.ownerUID + debt.payToUID + debt.amount}>
                <div //colored bullet
                  style={{
                    backgroundColor: debt.color,
                    borderRadius: '50%',
                    width: '10px',
                    height: '10px',
                    marginRight: '8px',
                  }}
                />
                {debt.debtor} : pay {debt.debtee} ${debt.amount.toFixed(2)}
              </div>
            )
          })
        ) : isDebtOneUser ? (
          <div className='small-text'>No individual debts.</div>
        ) : (
          <div
            className='small-text'
            style={{ width: '80%', alignSelf: 'flex-start', marginLeft: '12px' }}>
            Add paid amounts more than owed amounts to start building debts between users...
          </div>
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
