import React from 'react';

export function Btn(props: { icon: string, tooltip: string, onClick: () => void, selected?: boolean }) {
    let className = 'btn ' + props.icon;
    if (props.selected) {
        className += ' btn-selected';
    }
    return (
        <div className={className} onClick={props.onClick}>
            <div className='tooltip-container'>
                <div className="tooltip-arrow"></div>
                <div className='tooltip'>{props.tooltip}</div>
            </div>
        </div>
    );

}