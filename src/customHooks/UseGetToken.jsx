import React from 'react'
import { useSelector } from 'react-redux'

export const UseGetToken = () => {
  return useSelector(state=> state.AuthSlice.user.token) || '';
}
