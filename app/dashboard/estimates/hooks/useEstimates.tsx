import React, { useEffect, useState } from 'react'
import { CustomFile, File } from '../types'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { firestore } from '@/firebase/config'
import { toast } from 'react-toastify'
import useAuth from '@/app/(auth)/Hooks/useAuth'
import { useCollection } from 'react-firebase-hooks/firestore'

const useEstimates = () => {
    const [saveLoading, setSaveLoading] = useState(false)
    const [estimate, setEstimate] = useState<File[]>([])

    const { user } = useAuth()

    const estimateQuery = user
        ? query(
            collection(firestore, "sales-estimates"),
            where("owner", "==", user?.uid)
        ) : null;

    const [estimateSnapShot, loading, error] = useCollection(estimateQuery)

    useEffect(() => {
        if (estimateSnapShot && !loading) {
            const fetchedEstimates = estimateSnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEstimate(fetchedEstimates as CustomFile[]);
        }
    }, [estimateSnapShot, loading]);


    const saveEstimate = async (file: CustomFile) => {

        try {
            setSaveLoading(true)

            await addDoc(collection(firestore, "sales-estimates"), file)
            toast.success("Estimate Saved!")
        } catch (error: any) {
            toast.error("An error occured while saving estimate.")
        }

    }

    return { saveEstimate, saveLoading, estimate }
}

export default useEstimates