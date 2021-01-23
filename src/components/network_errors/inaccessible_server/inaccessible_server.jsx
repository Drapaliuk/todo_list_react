import React from 'react'
import { GrServerCluster } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { checkAccessabilityServer } from '../../../redux/actions';

export function InaccessibleServer() {
    const dispatch = useDispatch();
  const isServerInaccessible = useSelector(state => state.initialize.isServerInaccessible)
    
    React.useEffect(() => {

        if(isServerInaccessible) {
            var checkInterval = setInterval(() => {
                dispatch(checkAccessabilityServer())
            }, 5000)
        }

        return () => clearInterval(checkInterval)
    }, [])

    return (
        <div className = "authorization">
            <div className = 'not-network__wrapper'>
                <GrServerCluster className = 'not-network__icon' />
                <h1 className = 'not-network__message'>Sorry, server is inaccessible.</h1>
            </div>
        </div>
    )
}