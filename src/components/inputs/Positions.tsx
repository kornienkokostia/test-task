import React, { useState, useEffect } from 'react';
import { Position } from '../../models/positions';
import ApiService from '../../services/ApiService';
import './positions.scss';

interface PositionsProps {
  currentPosition: number;
  setCurrentPosition: React.Dispatch<React.SetStateAction<number>>;
}

export const Positions = (props: PositionsProps) => {
  const [positions, setPositions] = useState<Position[]>();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = async () => {
    const positionsResponse = await ApiService().getPositions();
    setPositions(positionsResponse.positions);
    props.setCurrentPosition(positionsResponse.positions[0].id);
  };

  return (
    <div className="registration-positions">
      <p>Select your position</p>
      {positions &&
        positions.map((el, i) => {
          return (
            <div className="registration-position" key={i}>
              <input
                type="radio"
                name="positions"
                value={el.id}
                id={el.name}
                className="registration-position-input"
                checked={el.id === props.currentPosition ? true : false}
                onChange={e =>
                  props.setCurrentPosition(+e.target.value)
                }></input>
              <label htmlFor={el.name} className="registration-position-text">
                {el.name}
              </label>
              <div className="registration-position-custom-input"></div>
            </div>
          );
        })}
    </div>
  );
};
