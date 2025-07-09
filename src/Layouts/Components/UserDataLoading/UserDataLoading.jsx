import "./UserDataLoading.css";

const UserDataLoading = () => {
  return (
    <>
      <div className="main_user_data_loading_container">
        <div className="user_data_loading_container">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin "></div>
          <p>Updating user...</p>
        </div>
      </div>
    </>
  );
};

export default UserDataLoading;