import React, { useState, useEffect } from 'react';
import DatabaseModal from './DatabaseModal';
import axios from 'axios';
import { url } from '../../App';

export default function DatabaseRow({ gsc }) {
  const [showGscModal, setShowGscModal] = useState(false);
  const [ageRange, setAgeRange] = useState();
  const [personality, setPersonality] = useState("");
  const [refs, setRefs] = useState([]);
  const handleCloseGscModal = () => setShowGscModal(false);
  const handleShowGscModal = () => setShowGscModal(true);

  useEffect(() => {
    axios.get(`${url}/gscs/references/${gsc.uuid}`)
    .then((response) => {
      setRefs(response.data)
    })
    .catch((error) => {
      console.log(error)
    })

    let current_year = new Date().getFullYear()
    let age = current_year - gsc.year_of_birth
    setAgeRange(age)
    let minRange = 19
    let maxRange = 23
    function between(age, minRange, maxRange) {
      return age >= minRange && age <= maxRange
    }
    for (maxRange = 23; maxRange < 82; maxRange += 2) {
      minRange += 2
      if (between(age, minRange, maxRange)) {
        return (
          setAgeRange(`${minRange} - ${maxRange}`)
        )
      }
    }

    if (gsc.mbti !== "") {
      setPersonality(`${gsc.mbti}`)
    }
    if (gsc.enneagram !== "") {
      if (personality !== "") {
        setPersonality(`${personality}, Enneagram: ${gsc.enneagram}`)
      }
      else {
        setPersonality(gsc.enneagram)
      }
    }
    if (gsc.disc !== "") {
      if (personality !== "") {
        setPersonality(`${personality}, ${gsc.disc}`)
      }
      else {
        setPersonality(gsc.disc)
      }
    }
    if (gsc.strengths_finder !== "") {
      if (personality !== "") {
        setPersonality(`${personality}, ${gsc.strengths_finder}`)
      }
      else {
        setPersonality(gsc.strengths_finder)
      }
    }
  }, [gsc.uuid, personality, gsc.mbti, gsc.enneagram, gsc.disc, gsc.strengths_finder, gsc.year_of_birth]);

  return (
    <>
      <tr onClick={handleShowGscModal}>
        <td>{gsc.alias}</td>
        <td>{ageRange}</td>
        <td>{gsc.city}, {gsc.country}</td>
        <td>Town: {gsc.moving_to_a_different_town}%, Country: {gsc.moving_to_a_different_country}%</td>
        <td>{gsc.height}</td>
        <td>{gsc.languages}</td>
        <td>{gsc.nationality}</td>
        <td>{gsc.descriptive_words}</td>
        <td>{personality}</td>
        <td>{gsc.church_background}</td>
        <td>{gsc.spiritual_maturity}</td>
        <td>{gsc.spiritual_gifts}</td>
        <td>{gsc.reasons_gscf_makes_a_good_partner}
        {
          refs.map((ref) => {
            return (
              `, ${ref.reasons_gscf_makes_a_good_partner}`
            )
          })
        }
        </td>
        <td>{gsc.good_match_for_gscf}
        {
          refs.map((ref) => {
            return (
              `, ${ref.good_match_for_gscf}`
            )
          })
        }
        </td>
        <td>{gsc.what_is_important_to_me}</td>
      </tr>
      <DatabaseModal
        gsc={gsc}
        showGscModal={showGscModal}
        handleCloseGscModal={handleCloseGscModal}
      />
    </>
  )
}
