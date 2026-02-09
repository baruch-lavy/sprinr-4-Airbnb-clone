import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay } from '../store/actions/stay.actions'


export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])


  return (
    <section className="stay-details">
      {stay && <div>
        <h3 className='stay-description'>{stay.summary.split(' ').slice(0, 10).join(' ').replace(':','')}</h3>
        <div className="stay-gallery">
          {stay.imgUrls.map((url, idx) => (
            <img key={idx} src={url} alt={`Stay image ${idx + 1}`} className="stay-image" />
          ))}
        </div>
      </div>
      }
    </section>
  )
}