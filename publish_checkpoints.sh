#!/usr/bin/env bash

# Copyright 2020 MyGate™
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


# check for pip executable
if ! which pip > /dev/null; then
    logger -t "$LOGTAG" "$0: Can't find 'pip' executable. Aborted."
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python get-pip.py --user
fi

# include the python cli executables for utility.
export PATH=~/.local/bin/:~/Library/Python/2.7/bin:$PATH

ZSH_KEY="/bin/zsh"

# check for aws cli executable
if ! which aws > /dev/null; then
    logger -t "$LOGTAG" "$0: Can't find 'aws cli' executable. Aborted."
    pip install awscli --user
    if [ "$SHELL" = "$ZSH_KEY" ]; then
        echo "zsh is the profile"
        echo "export PATH=~/.local/bin/:~/Library/Python/2.7/bin:$PATH" >> ~/.zshrc
        source ~/.zshrc
    else
        echo "sh is the profile"
        echo "export PATH=~/.local/bin/:~/Library/Python/2.7/bin:$PATH" >> ~/.bash_profile
        source ~/.bash_profile
    fi
fi

# export PATH=~/.local/bin/:~/Library/Python/2.7/bin:$PATH



# check for aws config file.

AWS_CONFIG_FILE=~/.aws/config

if test -f "$AWS_CONFIG_FILE"; then
    echo "$AWS_CONFIG_FILE exists"
else
    echo "aws config is needed for running proceeding ahead. Please create it at : "+${AWS_CONFIG_FILE}+"\n"
    echo "for reference : https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration"
    aws configure
#    exit 1
fi