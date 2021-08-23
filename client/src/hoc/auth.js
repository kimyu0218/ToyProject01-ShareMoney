import React, { useEffect } from 'react';
import { auth } from '../_actions/user_action';
import { useSelector, useDispatch } from "react-redux";

export default function Auth (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                if (!response.payload.isAuth) { // 로그인 상태 X
                    if (option) {
                        props.history.push('/login')
                    }
                } else { // 로그인 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}