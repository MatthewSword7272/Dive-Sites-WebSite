class UsersController < ApplicationController

  def index
    @users = User.all
    if @users
      render json: {
        users: @users
      }
    else
      render json: {
        status: 500,
        errors: ['no users found']
      }
    end
  end

  def user
    render json: {
      user: current_user!
    }
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
