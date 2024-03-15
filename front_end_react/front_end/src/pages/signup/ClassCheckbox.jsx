const ClassCheckbox = ({ onCheckboxChange, selectedClass }) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedClass === "Consumer" ? "selected" : ""} `}>
					<span className='label-text'>Consumer</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedClass === "Consumer"}
						onChange={() => onCheckboxChange("Consumer")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedClass === "BusinessRepresentative" ? "selected" : ""}`}>
					<span className='label-text'>BusinessRepresentative</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedClass === "BusinessRepresentative"}
						onChange={() => onCheckboxChange("BusinessRepresentative")}
					/>
				</label>
			</div>
		</div>
	);
};
export default ClassCheckbox;