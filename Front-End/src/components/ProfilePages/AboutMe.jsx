/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
function AboutMe({ user }) {
  return (
    <div className="container">
      <div className="row">
        <div className="text-center">
          <img
            src={user.profilePicture}
            alt={user.username}
            style={
              {
                borderRadius: '50%', height: '300px', width: '300px', objectFit: 'cover',
              }
              }
            className="image-responsive"
            data-holder-rendered="true"
          />
        </div>
      </div>
      <div className="row">
        <h1 className="text-center">{user.username}</h1>
      </div>
      <div className="row">
        <h3 className="text-center">{user.firstName + ' ' + user.lastName}</h3>
      </div>
      <div className="row">
        <p className="text-center">{user.bio}</p>
      </div>
      <div className="row">
        <button type="button" className="btn btn-lg">Fave Button</button>
      </div>
    </div>
  );
}

export default AboutMe;
