import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon/AnimatedLoadingIcon";
import "./MemberFamilyTree.css";
import { MembersContext } from "../../context/MembersContext";

function Node(data, level) {
  this.data = data;
  this.level = level;
  this.children = [];
  this.sibling = [];
}
class Tree {
  constructor() {
    this.root = null;
  }
  add(data, toNodeData) {
    const node = new Node(data);
    const parent = toNodeData ? this.findBFS(toNodeData) : null;
    if (parent) {
      node.level = parent.level + 1;
      parent.children.push(node);
    } else {
      if (this.root && node.data.team.toLowerCase().includes("operation")) {
        node.level = 0;
        let parent = this.root;
        parent.sibling.push(node);
        this.root = parent;
      } else if (!this.root) {
        node.level = 0;
        node.sibling.push(node);
        this.root = node;
      } else return "Tried to store node as root when root already exists.";
    }
  }

  findBFS(data) {
    let _node = null;

    this.traverseBFS((node) => {
      if (node.sibling.length > 0) {
        node.sibling.forEach((item) => {
          if (item.data.id === data.id) {
            _node = node;
          }
        });
      } else if (node.data.id === data.id) {
        _node = node;
      }
    });

    return _node;
  }

  traverseBFS(cb) {
    const queue = [this.root];
    if (cb)
      while (queue.length) {
        const node = queue.shift();

        cb(node);

        for (const child of node.children) {
          queue.push(child);
        }
      }
  }
}

class MemberFamilyTreeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlRenderMembersTree: [],
      currentLevel: 0,
    };
    this.handleRenderFamilyTree = this.handleRenderFamilyTree.bind(this);
    this.createHtmlForMemberTree = this.createHtmlForMemberTree.bind(this);
    this.handleCreateTreeData = this.handleCreateTreeData.bind(this);
    this.debounce = this.debounce.bind(this);
    this.debounceTimeout = React.createRef().current;
  }
  componentDidMount() {
    this.handleRenderFamilyTree();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.handleRenderFamilyTree();
    }
  }
  handleCreateTreeData(listMembers) {
    const tree = new Tree();
    for (let i = 0; i < listMembers.length; i++) {
      if (!listMembers[i].managedBy) {
        tree.add(listMembers[i]);
        continue;
      }
      tree.add(listMembers[i], listMembers[i].managedBy);
    }
    return [tree.root];
  }
  handleRenderFamilyTree() {
    const { listMembers } = this.props;
    if (listMembers.length <= 0) {
      return;
    }
    const data = this.handleCreateTreeData(listMembers);
    const html = this.createHtmlForMemberTree(data);
    this.setState({
      htmlRenderMembersTree: html,
    });
  }
  handleToggleNodeConnectionLine(ulRef, level, index) {
    let liTag = ulRef.current.querySelectorAll(
      `.level${level - 1}_${level - 1}`
    )[index];
    let ulElement = liTag.querySelector(".list");
    if (ulElement) {
      ulElement.classList.toggle("isActive");
    }
  }
  handleDecreaseTreeWidth() {
    document.querySelector(".treeWrap").classList.add("resized");
  }
  handleIncreaseTreeWidth() {
    document.querySelector(".treeWrap").classList.remove("resized");
  }
  toggleChildren(liRef, level) {
    let toggleChildrenTimeout = setTimeout(() => {
      const element = liRef.current;
      let liTagsElement = element.querySelectorAll(`.level${level}_${level}`);
      liTagsElement.forEach((el, index) => {
        if (el.style.display === "none") {
          el.style.animation = "showChild .6s";
          el.style.display = "inline-table";
          this.resizeTreeWidth(level);
        } else {
          el.style.animation = "hideChild .3s ";
          let displayNoneTimeout = setTimeout(() => {
            el.style.display = "none";
            this.resizeTreeWidth(level);
            clearTimeout(displayNoneTimeout);
          }, 300);
        }
        clearTimeout(toggleChildrenTimeout);
      });
    }, 300);
  }
  resizeTreeWidth(level) {
    if (level>0) {
      this.handleDecreaseTreeWidth();
    } else {
      this.handleIncreaseTreeWidth();
    }
  }
  debounce(func, timeout = 300) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      func();
    }, timeout);
  }
  handleToggleChildren(e, liRef, nextLevel, ulRef, index) {
    e.stopPropagation();
    this.debounce(() => {
      this.handleToggleNodeConnectionLine(ulRef, nextLevel, index);
      this.toggleChildren(liRef, nextLevel);
    });
  }
  createHtmlForMemberTree(children) {
    const ulRef = React.createRef();

    const output = (
      <ul ref={ulRef} className="list">
        {children.map((child, index) => {
          const liTagRef = React.createRef();
          return (
            <li
              ref={liTagRef}
              className={`level${child.level}_${child.level}`}
              style={{ display: child.level === 0 ? "inline-table" : "none" }}
              key={child.data.id}
            >
              <NavLink
                onClick={(e) => {
                  this.handleToggleChildren(
                    e,
                    liTagRef,
                    child.level + 1,
                    ulRef,
                    index
                  );
                }}
                to="#"
              >
                <div className="nodeSibling">
                  {child.sibling.length > 0 ? (
                    child.sibling.map((root) => (
                      <div className="sib" key={root.data.id}>
                        <img
                          className="nodeAvatar"
                          src={root.data.picture}
                          alt=""
                        />
                        <div className="nodeDetails">
                          <p>{root.data.name} </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <img
                        className="nodeAvatar"
                        src={child.data.picture}
                        alt=""
                      />
                      <div className="nodeDetails">
                        {/* <p>{child.data.name} </p> */}
                          {child.children.length > 0
                            ? <p>{child.data.leaderOf}</p> 
                            : " "}
                      </div>{" "}
                    </>
                  )}
                </div>
              </NavLink>
              {child.children.length > 0
                ? this.createHtmlForMemberTree(child.children)
                : ""}
            </li>
          );
        })}
      </ul>
    );
    return output;
  }

  render() {
    const { htmlRenderMembersTree } = this.state;
    const { isLoading } = this.props;
    return (
      <>
        {!isLoading ? (
          <div className="treeWrap">{htmlRenderMembersTree}</div>
        ) : (
          <AnimatedLoadingIcon />
        )}
      </>
    );
  }
}

class MemberFamilyTree extends Component {
  render() {
    return (
      <MembersContext.Consumer>
        {({ isLoading, listMembers }) => (
          <MemberFamilyTreeComponent
            isLoading={isLoading}
            listMembers={listMembers}
          />
        )}
      </MembersContext.Consumer>
    );
  }
}

export default MemberFamilyTree;
